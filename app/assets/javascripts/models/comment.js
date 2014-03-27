(function () {
	"use strict";
	/*global HexApp, Backbone */
	HexApp.Models.Comment = Backbone.Model.extend({
		
		dateString: function () {
			 var date  = new Date(this.get("created_at"));
			 return date.toDateString();
		}
	});
})();