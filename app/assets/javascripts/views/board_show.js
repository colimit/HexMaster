/*global HexApp, Backbone, $ */
(function(){
	"use strict";
	HexApp.Views.BoardShow = Backbone.View.extend({
	
		initialize: function (options){
			this.gameNav = options.gameNav;
			this.board = options.gameNav.board;
			this.size = this.board.size;
			this.$el.addClass("hex-board" + this.size);
			this.makeSpaces();
			this.makeRankLabels();
			this.makeRowLabels();
			this.affixElements();
			this.board.on("setHex", this.setSpace.bind(this));
			this.board.on("resign", this.updateWinner.bind(this))
		},
		
		makeSpaces: function(){
			this.spaces = [];
			for (var i = 0; i < this.size; i++){
				this.spaces.push([]);
				for (var j = 0; j < this.size; j++){
					this.spaces[i][j] = new HexApp.Views.SpaceShow({ 
						coord: [i,j] 
					});
				}
			}
		},
		
		makeRankLabels: function() {
			this.rankLabels = []
			for (var i = 0; i < this.size; i++ ) {
				this.rankLabels.push(
					new HexApp.Views.LabelShow({ coord: [i, -1] })
				);
			}
		},
		
		makeRowLabels: function() {
			this.fileLabels = []
			for (var i = 0; i < this.size; i++ ) {
				this.fileLabels.push(
					new HexApp.Views.LabelShow({ coord: [-1, i] })
				);
			}
		},
		
		events: {
			"click .hex-space": "handleSpaceClick"
		},
		
		handleSpaceClick: function (event) {
			var move = $(event.target).attr("id");
			this.gameNav.push(move);
		},
		
		updateWinner: function (won) {
			var winner = this.gameNav.board.winner() || won;
			if (winner) {
				var capitalizedWinner = winner.charAt(0).toUpperCase() + 
											winner.slice(1);
						
				this.$winnerEl.html(capitalizedWinner + " wins")
				this.$winnerEl.addClass(winner+ "-name")
				this.$winnerEl.removeClass("hidden")
			} else {
				this.$winnerEl.empty();
				this.$winnerEl.removeClass("red-name blue-name")
				this.$winnerEl.addClass("hidden")
			}
		},
	
		affixElements: function(){
			var that = this;
			this.forEachSpace( function (space) {
				that.$el.append(space.$el);
			});
			this.$winnerEl = $("<div class='winner-display'>");
			this.$el.append(this.$winnerEl);
			this.rankLabels.forEach(function (rankLabel){
				that.$el.append(rankLabel.$el)
			});
			this.fileLabels.forEach(function (fileLabel){
				that.$el.append(fileLabel.$el)
			})
		},
	
		renderSpaces: function(){
			this.forEachSpace( function (space) {
				space.render();
			});
		},
		
		renderRankLabels: function () {
			this.rankLabels.forEach( function(rankLabel){ rankLabel.render(); })
		},
		
		renderFileLabels: function () {
			this.fileLabels.forEach( function(fileLabel){ fileLabel.render(); })
		},
	
		render: function () {
			this.renderSpaces();
			this.renderRankLabels();
			this.renderFileLabels();
			return this;
		},
	
		forEachSpace: function(callback) {
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					callback(this.spaces[i][j]);
				}
			}	
		},
		
		getSpace: function(coord) {
			return this.spaces[coord[0]][coord[1]];
		},
		
		setSpace: function(coord, color) {
			this.getSpace(coord).setPiece(color);
			this.updateWinner();
		}
	
	});
})();