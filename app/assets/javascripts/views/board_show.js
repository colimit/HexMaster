/*global HexApp, Backbone, $ */
(function(){
	"use strict";
	HexApp.Views.BoardShow = Backbone.View.extend({
	
		initialize: function (options){
			this.gameNav = options.gameNav;
			this.board = options.gameNav.board;
			this.size = this.board.size;
			this.$el.addClass("hex-board" + this.size);
			this.makeElements();
			this.gameNav.on("change", this.render.bind(this));
		},
		
		makeElements: function () {
			this.makeSpaces();
			this.makeRankLabels();
			this.makeRowLabels();
			//the winner display is too simple for its own view class
			this.$winnerEl = $("<div class='winner-display'>");
		},
		
		affixElements: function(){
			var that = this;
			this.$el.append(this.$winnerEl);
			this.forEachSpace( function (space) {
				that.$el.append(space.$el);
			});
			this.rankLabels.forEach(function (rankLabel){
				that.$el.append(rankLabel.$el);
			});
			this.fileLabels.forEach(function (fileLabel){
				that.$el.append(fileLabel.$el);
			});
		},
		
		makeSpaces: function(){
			this.spaces = [];
			for (var i = 0; i < this.size; i++){
				this.spaces.push([]);
				for (var j = 0; j < this.size; j++){
					this.spaces[i][j] = new HexApp.Views.SpaceShow({ 
						coord: [i,j],
						board: this.board
					});
				}
			}
		},
		
		makeRankLabels: function() {
			this.rankLabels = [];
			for (var i = 0; i < this.size; i++ ) {
				this.rankLabels.push(
					new HexApp.Views.LabelShow({ coord: [i, -1] })
				);
			}
		},
		
		makeRowLabels: function() {
			this.fileLabels = [];
			for (var i = 0; i < this.size; i++ ) {
				this.fileLabels.push(
					new HexApp.Views.LabelShow({ coord: [-1, i] })
				);
			}
		},
		
		events: { "click .hex-space": "handleSpaceClick" },
		
		handleSpaceClick: function (event) {
			var move = $(event.target).attr("id");
			this.gameNav.push(move);
			this.gameNav.trigger("change");
		},
		
		renderWinner: function () {
			var winner = this.gameNav.winner()
			if (winner) {
				var capitalizedWinner = winner.charAt(0).toUpperCase() + 
											winner.slice(1);				
				this.$winnerEl.html(capitalizedWinner + " wins");
				this.$winnerEl.addClass(winner+ "-name");
				this.$winnerEl.removeClass("hidden");
			} else {
				this.$winnerEl.empty();
				this.$winnerEl.removeClass("red-name blue-name");
				this.$winnerEl.addClass("hidden");
			}
		},

	
		renderSpaces: function(){
			this.forEachSpace( function (space) { space.render(); });
		},
		
	
		render: function () {
			this.$el.empty();
			this.renderSpaces();
			this.renderWinner();
			this.affixElements();
			return this;
		},
	
		forEachSpace: function(callback) {
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					callback(this.spaces[i][j]);
				}
			}	
		}
	
	});
})();