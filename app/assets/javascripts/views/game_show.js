/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.GameShow = Backbone.View.extend({
		
		template: JST["games/show"],
		
		initialize: function () {
			this.size = this.model.get("size");
			this.board = new HexApp.Board(this.size);
			this.listenTo(this.model, "sync", this.render);
			this.boardView = new HexApp.Views.BoardShow({ board: this.board });
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
			this.$("#board").append(this.boardView.$el);
			this.boardView.delegateEvents();
			this.resetBoard();
			return this;
		},
		
		resetBoard: function () {
			this.board.clear();
			if (this.model.get("moves")) { 
				this.board.handleMoves(this.model.get("moves")); 
			}
		}
		
	});
})();