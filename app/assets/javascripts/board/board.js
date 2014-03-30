(function () {
	"use strict";
	/*global HexApp */

	HexApp.Board = function (size) {
		this.size = size;
		this.rows = [];
		for (var i = 0; i < this.size; i++){
			this.rows.push([]);
			for (var j = 0; j < this.size; j++){
				this.rows[i][j] = 0;
			}
		}
		this.turnColor = "red";
	};

	HexApp.stringToCoord = function (string){
		var col = string.charCodeAt(0) - "a".charCodeAt(0);
		var row = parseInt(string.slice(1), 10) - 1;
		return [row, col];
	};
	
	HexApp.coordToString = function(coord) {
		var file = String.fromCharCode(97 + coord[1]);
		return file + (coord[0] + 1);
	};

	HexApp.Board.prototype = {
		
		adjacency: [[-1, 0], [0, -1], [-1, 1], [1, -1], [1, 0], [0, 1]],
	
		swap: function(){
			var boardCopy = this.duplicate();
			var turnColor = this.oppositeColor(this.turnColor);
			this.clear();
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					var color =  this.oppositeColor(boardCopy.getHex([j, i]));
					this.setHex([i, j], color);
				}
			}
			this.changeTurn(turnColor);
		},
		
		changeTurn: function (color) {
			this.turnColor = (color || this.oppositeColor(this.turnColor));
		},
	
		oppositeColor: function(color){
			if (color === "red") {
				return "blue";
			} else if (color === "blue" ){
				return "red";
			} else {
				return 0;
			}
		},
	
		duplicate: function(){
			var newBoard = new HexApp.Board(this.size);
			for (var i = 0; i < this.size; i++){
				newBoard.rows.push([]);
				for (var j = 0; j < this.size; j++){
					newBoard.rows[i][j] = this.rows[i][j];
				}
			}
			newBoard.turnColor = this.turnColor;
			return newBoard;
		},
	
		setHex: function(coord, color){
			this.rows[coord[0]][coord[1]] = color;
		},
	
		getHex: function(coord){
			return  this.rows[coord[0]] && this.rows[coord[0]][coord[1]];
		},
	
		handleMove: function(move) {
			if (this.valid(move)) {
				if (move === "swap") {
					this.swap();
				} else if (move != "resign") {
					this.normalMove(HexApp.stringToCoord(move));
				}
				return true;
			} else {
				return false;
			}
		},	
	
		valid: function(move){
			if (this.winner()) { return false; }
			if (move === "swap"){
				return this.canSwap();
			} else if (move === "resign") {
				return true;
			} else {
				return move && (!this.getHex(HexApp.stringToCoord(move)));
			}
		},
	
		//it is possible to swap if there is one piece on the
		//board, and it is red.
		canSwap: function(){
			var count = 0;
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					var piece = this.getHex([i,j]);
					if (piece === "blue") { return false; }
					if (piece === "red") { count++; } 
				}
			}
			return count === 1;
		},
	
		normalMove: function(coord) {
			this.setHex(coord, this.turnColor);
			this.changeTurn();
		},
	
		undo: function() {
		
		},
	
		//returns who has connected their sides.
		winner: function(){
			if (this.isWinner("red")) {
				return "red";
			} else if (this.isWinner("blue")) {
				return "blue";
			} else {
				return null;
			}
		},
		
		//returns true if color has connected their sides, false otherwise.
		isWinner: function(color){
			var stack = this.startPieces(color);
			var visited = this.startPieces(color);
			var that = this;
			var isVisited = function(coord){
				return visited.some( function (oldCoord){
					return oldCoord[0] === coord[0] && oldCoord[1] === coord[1];
				});
			};
			var processNewCoord = function (newCoord) {
				if (that.isFinish(newCoord, color)) {
					return true;
				} else if (!isVisited(newCoord)) {	
					visited.push(newCoord);
					stack.push(newCoord);
				}
			};
			while (stack.length > 0){
				var coord = stack.pop();
				if (this.neighbors(coord).some(processNewCoord)){
					return true;
				}
			}
			return false;
		},
	
		startPieces: function(color) {
			var starts = [];
			var coord;
			for (var i = 0; i < this.size ; i++ ){
				if (color === "red") {
					coord = [0, i];
				} else if (color === "blue") {
					coord = [i, 0];
				}
				if (this.getHex(coord) === color) {
					starts.push(coord);
				}
			}
			return starts;
		},
	
		isFinish: function (coord, color) {
			if (color === "red") {
				return coord[0] === this.size - 1;
			} else if (color === "blue") {
				return coord[1] === this.size - 1;
			}
		},
		
		neighbors: function (coord) {
			var neigbs = [];
			var color = this.getHex(coord);
			var that = this;
			this.adjacentCoords(coord).forEach(function (newCoord) {
				if (that.getHex(newCoord) === color){
					neigbs.push(newCoord);
				}
			});
			return neigbs;
		},
		
		adjacentCoords: function (coord) {
			var adjs = [];
			this.adjacency.forEach(function (step) {
				adjs.push([coord[0] + step[0], coord[1] + step[1]]);
			});
			return adjs;
		},
		
		clear: function () {
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					this.setHex([i,j], 0);
				}
			}
			this.changeTurn("red");
		}
	
	};
})();