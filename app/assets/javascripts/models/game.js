(function () {
	"use strict";
	/*global HexApp, Backbone*/
	HexApp.Models.Game = Backbone.Model.extend({
		
		url: function() {
			return "/games/" + this.get("little_golem_id"); 
		},
		
		parse: function (jsonResp) {
			if (jsonResp.comments) {
				this.comments().add(jsonResp.comments);
				delete jsonResp.comments;
			}
			return jsonResp;
		},
		
		comments: function () {
			this._comments = this._comments || 
				new HexApp.Collections.GameComments();
			return this._comments;
		}
		
	});
	
})();