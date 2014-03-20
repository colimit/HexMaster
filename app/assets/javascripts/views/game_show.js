/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.GameShow = Backbone.View.extend({
		
		template: JST["games/show"],
		
		initialize: function () {
			this.gameNav = new HexApp.GameNav(this.model);
			this.boardView = new HexApp.Views.BoardShow({ 
				board: this.gameNav.board
			});
			this.gameMovesView = new HexApp.Views.GameMoves({
				gameNav: this.gameNav
			});
		},
		
		
		subviews: function () {
			if (!this._subviews) {
				this._subviews = {};
			}
			return this._subviews;
		},
		
		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.$("#board").append(this.boardView.render().$el);
			this.boardView.delegateEvents();
			this.$("#moves").append(this.gameMovesView.render().$el)
			this.gameMovesView.delegateEvents();
			return this;
		},
		
		reset: function () {
			this.gameNav.jump();
		}
		
	});
})();