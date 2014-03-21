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
			this.fragmentView = new HexApp.Views.Fragment({
				gameNav: this.gameNav
			});
		},
		
		events: {
			"click .hex-space": "handleSpaceClick"
		},
		
		handleSpaceClick: function (event) {
			var move = $(event.target).attr("id");
			this.gameNav.push(move);
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
			this.$("#moves").append(this.fragmentView.render().$el)
			this.fragmentView.delegateEvents();
			return this;
		},
		
		reset: function () {
			this.gameNav.jump();
		}
		
	});
})();