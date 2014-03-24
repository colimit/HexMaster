/*global HexApp, Backbone, JST $*/
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
			this.gameNav.on("setBaseMove", this.base.bind(this));
			this.gameNav.on("setCurrentMove", this.setCurrentMove.bind(this));
			this.scrollPosition = 0;
			this.currentMoveNum = 0;
		},
		
		refreshScrollPosition: function(){
			this.scrollPosition = this.$(".moves-table-body").scrollTop();
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
			this.refreshScrollPosition();
			var number = parseInt($(event.target).parent().data("number"), 10);
			this.gameNav.jump(number);
		},
		
		
		handleBranchMoveClick: function (event) {
			this.refreshScrollPosition();
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
			this.refreshScrollPosition();
			this.rowViews = this.rowViews.slice(0, this.gameLength);
			for (var number = 1; number <= this.gameLength; number++){
				this.rowViews[number - 1].setBranchMove("");
			}
			this.render();
		},
		
		setBranchMove: function(number, move) {
			this.refreshScrollPosition();
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
		
		base: function(moveNum){
			this.rowViews.forEach(function(rowView, index){
				if (moveNum != index + 1){
					rowView.unbase();
				} else if (moveNum === index + 1){
					rowView.base();	
				}
			});
		},
		
		setCurrentMove: function(moveNum){
			this.rowViews.forEach(function(rowView, index){
				var selected = rowView.$el.hasClass("selected");
				if (moveNum != index + 1 && selected) {
					rowView.unselect();
				} else if (moveNum === index + 1 && !selected){
					rowView.select();
				}
			});
			this.currentMoveNum = moveNum;
			this.fixScrollPosition();
		},
		
		fixScrollPosition: function(){
			var tableBody = this.$(".moves-table-body");
			var oldPosition = this.scrollPosition;
			var moveNum = this.currentMoveNum;
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

