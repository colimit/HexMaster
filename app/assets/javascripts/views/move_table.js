/*global HexApp, Backbone, JST $*/
(function(){
	"use strict";
	HexApp.Views.MoveTable = Backbone.View.extend({
		
		initialize: function(options) {
			this.gameNav = options.gameNav;
			this.gameMoves = this.gameNav.gameMoves;
			this.gameLength = this.gameMoves.length;
			this.gameNav.on("change", this.render.bind(this));
		},
		
		refreshScrollPosition: function(){
			if (this.$(".moves-table-body").length){
				this.scrollPosition = this.$(".moves-table-body").scrollTop();
			}
		}, 
		
		makeRowViews: function () {
			var that = this;
			this.rowViews = [];
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
			this.gameNav.trigger("change");
		},
		
		
		handleBranchMoveClick: function (event) {
			var number = parseInt($(event.target).parent().data("number"), 10);
			this.gameNav.branchJump(number);
			this.gameNav.trigger("change");
		},
		
		render: function() {
			this.refreshScrollPosition();
			this.$el.empty();
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.makeRowViews();
			this.setBranch();
			this.base();
			this.setCurrentMove();
			var that = this;
			this.rowViews.forEach( function(rowView){
				if (rowView) {
					that.$(".moves-table-body").append(rowView.render().$el);
				}
			});
			this.fixScrollPosition();
			return this;
		},
		
		clear: function() {
			this.refreshScrollPosition();
			this.rowViews = this.rowViews.slice(0, this.gameLength);
			for (var number = 1; number <= this.gameLength; number++){
				this.rowViews[number - 1].setBranchMove("");
			}
			this.render();
		},
		
		setBranch: function(){
			var that = this;
			this.gameNav.branch.forEach(function(move, index){
				that.setBranchMove(index + 1, move);
			});
		},
		
		setBranchMove: function(number, move) {
			if (this.rowViews[number - 1]){
				this.rowViews[number - 1].setBranchMove(move);
			} else {
				this.rowViews.push(new HexApp.Views.MoveRow({
					branchMove: move,
					number: number
				}));
			}
			if (this.rowViews[number - 1].isBlank()) {
				this.rowViews[number - 1] = undefined;
			}
		},
		
		base: function(){
			var moveNum = this.gameNav.baseMove;
			this.rowViews[moveNum - 1] && this.rowViews[moveNum - 1].base();
		},
		
		setCurrentMove: function(){
			var moveNum = this.gameNav.currentMoveNum();
			this.rowViews[moveNum - 1] && this.rowViews[moveNum - 1].select();
		},
		
		fixScrollPosition: function(){
			var tableBody = this.$(".moves-table-body");
			var oldPosition = this.scrollPosition;
			var moveNum = this.gameNav.currentMoveNum();
			if (oldPosition > this.scrollMin(moveNum)){
				tableBody.scrollTop(this.scrollMin(moveNum) - 100);
			} else if (oldPosition < this.scrollMax(moveNum)){
				tableBody.scrollTop(this.scrollMax(moveNum)+ 100) ;
			} else {
				tableBody.scrollTop(oldPosition);
			}
		},
		
		scrollMin: function(moveNum){
			return 24 * (moveNum - 1);
		},
		
		scrollMax: function(moveNum){
			return 12 + 24 * ( moveNum - 13);
		}
		
	});
})();

