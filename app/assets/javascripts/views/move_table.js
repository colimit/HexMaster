/*global HexApp, Backbone, $*/
(function(){
	"use strict";
	HexApp.Views.MoveTable = Backbone.View.extend({
		
		initialize: function(options) {
			this.gameNav = options.gameNav;
			this.gameMoves = this.gameNav.gameMoves;
			this.gameLength = this.gameMoves.length;
			this.rowViews = [];
			this.makeRowViews();
			this.gameNav.on("setBranchMove", this.setBranchMove.bind(this));
			this.gameNav.on("clearBranch", this.clear.bind(this)); 
			this.gameNav.on("setBaseMove", this.select.bind(this));
		},
		
		makeRowViews: function () {
			var that = this;
			this.gameMoves.forEach( function(move, i){
				that.rowViews.push(new HexApp.Views.MoveRow({
					gameMove: move,
					number: i + 1
				}));
			});
		},
		
		template: JST["games/moves"],
	
		tagName: "div",
		
		className: "moves-display",
		
		events: {
			"click .game-move,.move-number-cell": "handleGameMoveClick",
			"click .branch-move": "handleBranchMoveClick"
		},
		
		handleGameMoveClick: function (event) {
			var number = parseInt($(event.target).parent().data("number"), 10);
			this.gameNav.jump(number);
		},
		
		
		handleBranchMoveClick: function (event) {
			var number = parseInt($(event.target).parent().data("number"), 10);
			this.gameNav.branchJump(number);
		},
		
		render: function() {
			var that = this;
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.rowViews.forEach( function(rowView){
				if (rowView) {
					that.$(".moves-table-body").append(rowView.render().$el);
				}
			});
			return this;
		},
		
		clear: function() {
			this.rowViews = this.rowViews.slice(0, this.gameLength);
			for (var number = 1; number <= this.gameLength; number++){
				this.rowViews[number - 1].setBranchMove("");
			}
			this.render();
		},
		
		setBranchMove: function(number, move) {
			if (this.rowViews[number - 1]){
				this.rowViews[number - 1].setBranchMove(move);
			} else {
				this.rowViews.push(new HexApp.Views.MoveRow({
					branchMove: move,
					number: number
				}));
				this.render();
			}
			if (this.rowViews[number - 1].isBlank()) {
				this.rowViews[number - 1] = undefined;
				this.render();
			}
		},
		
		select: function(moveNum){
			this.rowViews.forEach(function(rowView, index){
				if (rowView.selected && moveNum != index + 1){
					rowView.unselect();
				} else if (!rowView.selected && moveNum === index + 1){
					rowView.select();	
				}
			});
		}
		
	});
})();