(function () {
	"use strict";
	/*global HexApp, Backbone */
	HexApp.Models.User = Backbone.Model.extend({
		urlRoot: "/users"
	});
})();