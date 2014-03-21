/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.GameShow = Backbone.CompositeView.extend({
		
		template: JST["games/show"],
		
		initialize: function () {
			var gameNav = this.gameNav = new HexApp.GameNav(this.model);
			var boardView = new HexApp.Views.BoardShow({ gameNav: gameNav });
			var movesView = new HexApp.Views.MoveTable({ gameNav: gameNav });
			this.addSubview("#board", boardView);
			this.addSubview("#moves", movesView);
		},

		
		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.renderSubviews();
			return this;
		},
		
		reset: function () {
			this.gameNav.jump();
		}
		
	});
})();