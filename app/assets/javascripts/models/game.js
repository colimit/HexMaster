(function () {
	"use strict";
	/*global HexApp, Backbone*/
	HexApp.Models.Game = Backbone.Model.extend({
		
		url: function() {
			return "/games/" + this.get("little_golem_id"); 
		}
		
		// parse: function (jsonResp) {
		// 	if (jsonResp.moves) {
		// 		this.moves = jsonResp.moves;
		// 		delete jsonResp.moves;
		// 	}
		// 	return jsonResp;
		// }	
		
	});
	
})();