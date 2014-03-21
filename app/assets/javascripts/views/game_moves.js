/*global HexApp, Backbone, $*/
(function(){
	"use strict";
	HexApp.Views.GameMoves = Backbone.View.extend({
		
		initialize: function(options) {
			var that = this;
			this.gameNav = options.gameNav;
			that.moveViews = [];
			this.gameNav.gameMoves.forEach( function(move, index){
				that.moveViews.push(new HexApp.Views.Move({
					move: move, 
					number: index + 1 
				}));
			});
			this.gameNav.on("setBaseMove", this.select.bind(this));
		},
	
		tagName: "ol",
		
		className: "game-moves",
		
		
		select: function(moveNum){
			this.moveViews.forEach(function(moveView, index){
				moveView.unselect();
				if (index + 1 === moveNum) { moveView.select()}
			})
		},
		
		events: {
			"click .move": "handleMoveClick"
		},
		
		handleMoveClick: function (event) {
			var move_number = parseInt($(event.target).data("number"), 10);
			this.gameNav.jump(move_number);
		},
		
		render: function() {
			var that = this;
			this.moveViews.forEach( function(moveView){
				that.$el.append(moveView.render().$el);
			});
			return this;
		}
		
	});
})();