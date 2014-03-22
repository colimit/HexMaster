(function(){
	/*global HexApp, Backbone, $*/
	"use strict";
	HexApp.Views.MoveRow = Backbone.View.extend({
		
		tagName: "tr",
		
		className: "move",
	
		initialize: function (options){
			this.number = options.number;
			this.gameMove = options.gameMove;
			this.branchMove = options.branchMove;
			var colorClass = (this.number % 2 === 0) ? "blue-row" : "red-row";
			this.$el.addClass(colorClass);
			this.$el.attr("data-number", this.number);
			this.makeViews();
		},
		
		makeViews: function () {
			this.$moveNumberCell = $("<td class='move-number-cell'>");
			this.$moveNumberCell.html(this.number + ".");
			this.gameMoveView = new HexApp.Views.Move({
				move: this.gameMove,
				number: this.number
			});
			this.gameMoveView.$el.addClass("game-move");
			this.branchMoveView = new HexApp.Views.Move({
				move: this.branchMove,
				number: this.number
			});
			this.branchMoveView.$el.addClass("branch-move");
		},
		
		render: function () {
			this.$el.append(this.$moveNumberCell);
			this.$el.append(this.gameMoveView.render().$el);
			this.$el.append(this.branchMoveView.render().$el);
			return this;
		},

		
		setBranchMove: function (move) {
			var oldMove = this.branchMoveView.move;
			this.branchMoveView.setMove(move);
			if (oldMove != move) { this.branchMoveView.render(); }
		},
		
		isBlank: function () {
			return !(this.gameMove || this.branchMove); 
		},

		select: function() {
			this.$el.addClass("selected");
			this.selected = true;
		},
		
		unselect: function() {
			this.$el.removeClass("selected");
			this.selected = false;
		},
	
	
	});
})();