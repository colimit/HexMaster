(function () {
	"use strict";
	/*global HexApp, Backbone */
		HexApp.Collections.GameComments = Backbone.Collection.extend({
			url: "comments",
			model: HexApp.Models.Comment
		});
})();