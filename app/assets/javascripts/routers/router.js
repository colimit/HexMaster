(function () {
	"use strict";
	/*global HexApp, Backbone */

	HexApp.Routers.Router = Backbone.Router.extend({
		routes: {
			"": "index",
			"games/:id": "gameShow"
		},

		initialize: function (options) {
			this.$rootEl = options.$rootEl;
			this.makeNavBar();
		},
		
		makeNavBar: function () {
			HexApp.navbar = new HexApp.Views.NavBar({$targetEl: $("#navbar")});
			HexApp.navbar.refresh()
		},

		index: function () {
			HexApp.games.fetch();
			var view = new HexApp.Views.GamesIndex();
			this._swapview(view);
		},
		
		gameShow: function (id) {
			var that = this;
			var game = new HexApp.Models.Game();
			game.set("little_golem_id", id);
			//the fact that the size of the game is only known upon
			//sync makes it difficult to initialize before the game is fetched.
			//For instance, the layout should depend on the size.
			game.fetch({
				success: function (fetched){
					var view = new HexApp.Views.GameShow({ model: fetched });
					that._swapview(view);
					view.reset();
				}
			});
		},

		_swapview: function (view) {
			this.$rootEl.empty();
			this.$rootEl.html(view.render().$el);
		}
	 
	});
	
})();