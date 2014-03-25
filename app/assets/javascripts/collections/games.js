(function () {
	"use strict";
	/*global HexApp, Backbone */
		HexApp.Collections.Games = Backbone.Collection.extend({
			url: "games",
			model: HexApp.Models.Game
		});
})();