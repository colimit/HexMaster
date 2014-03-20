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
		this.events = {};
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
			this.clear();
			for (var i = 0; i < this.size; i++){
				for (var j = 0; j < this.size; j++){
					var color =  this.oppositeColor(boardCopy.getHex([j, i]));
					this.setHex([i, j], color);
				}
			}
			this.changeTurn();
		},
		
		changeTurn: function () {
			this.turnColor = this.oppositeColor(this.turnColor);
			this.trigger("changeTurn");
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
			this.trigger("setHex", coord, color);
		},
	
		getHex: function(coord){
			return this.rows[coord[0]][coord[1]];
		},
	
		handleMove: function(move) {
			if (this.valid(move)) {
				if (move === "swap") {
					this.swap();
				} else if (move === "resign") {
					this.resign();
				} else {
					this.normalMove(HexApp.stringToCoord(move));
				}
				return true;
			} else {
				return false;
			}
		},
		
		handleMoves: function (moves) {
			var that = this;
			return moves.every(function (move) {
				return that.handleMove(move);
			});
		},
	
		valid: function(move){
			if (move === "swap"){
				return this.canSwap();
			} else if (move === "resign") {
				return true;
			} else {
				return (!this.getHex(HexApp.stringToCoord(move)));
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
			var color = this.turnColor;
			this.setHex(coord, this.turnColor);
			this.turnColor = this.oppositeColor(color);
			this.trigger("setTurn", this.turnColor);
		},
	
	
		//calls the named event's callback, with any additional arguments passed
		//along
		trigger: function(event) {
			var that = this;
			var args = [].slice.call(arguments, 1);
			if (this.events[event]){
				this.events[event].forEach(function(fn){
					fn.apply(that, args);
				});
			}
		
		},
	
		//sets up an event
		on: function(event, callback) {
			this.events[event] = this.events[event] || [];
			this.events[event].push(callback);
		},
	
		resign: function() {
			this.resigned = this.turnColor;
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
			var processNewCoord = function (newCoord) {
				if (that.isFinish(newCoord)) {
					return true;
				} else if (visited.indexOf(coord) > -1) {
					stack.push(newCoord);
				}
			};
			while (stack.length > 0){
				var coord = stack.pop();
				this.neighbors(coord).forEach(processNewCoord);
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
				return coord[1] === this.size - 1;
			} else if (color === "blue") {
				return coord[0] === this.size - 1;
			}
		},
		
		neighbors: function (coord) {
			var neigbs = [];
			var color = this.getHex(coord);
			this.adjacentCoords(coord).forEach(function (newCoord) {
				if (this.getHex(newCoord) === color){
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
		}
		
		
	
	};
})();