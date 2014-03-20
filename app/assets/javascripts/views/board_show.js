/*global HexApp, Backbone, $ */
(function(){
	"use strict";
	HexApp.Views.BoardShow = Backbone.View.extend({
	
		initialize: function (options){
			this.board = options.board;
			this.size = this.board.size;
			this.$el.addClass("hex-board" + this.size);
			this.makeSpaces();
			this.affixSpaces();
			this.board.on("setHex", this.setSpace.bind(this));
		},
		
		events: {
			"click .hex-space": "handleSpaceClick"
		},
		
		handleSpaceClick: function (event) {
			var move = $(event.target).attr("id");
			this.board.handleMove(move);
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
	
		affixSpaces: function(){
			var that = this;
			this.forEachSpace( function (space) {
				that.$el.append(space.$el);
			});
		},
	
		renderSpaces: function(){
			this.forEachSpace( function (space) {
				space.render();
			});
		},
	
		render: function () {
			this.renderSpaces();
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
		}
	
	});
})();