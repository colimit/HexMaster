(function () {
	"use strict";
	/*global HexApp */
	//This object represents a game navigation state, I.e. what the game show
	//view displays at any given time. The game Nav knows the moves in the
	//the game, knows the current base move number in the game
	//and has a "current fragment" which is responsible for holding
	//a variation from the base move. It also has a copy of the board, which
	//it is responsible for manipulating
	
	//The nav can be manipulated through...

	HexApp.GameNav = function (game) {
		this.gameMoves = game.get("moves");
		this.size = game.get("size");
		this.board = new HexApp.Board(this.size);
		this.fragment = [];
		this.baseMove = 0;
		this.jump();
	};


	HexApp.GameNav.prototype = {
		
		//this jumps to moveNum in the game moves list, and empties the fragment
		//if moveNum is not given, jumps to the end of the movelist
		jump: function (moveNum) {
			var board = this.board
			board.clear();
			console.log("jumping")
			this.resetFragment();
			if (moveNum === 0) { return true;}
			this.gameMoves.every(function (move, index) {
				return board.handleMove(move) && ( !moveNum || index < moveNum);
			});
		},
		
		back: function () {
			if (fragment.length > 0) {
				
			} else if (baseMove > 0) {
			}
		},
	
		resetFragment: function () {
			this.fragment = [];
		}
		
	};
		
})();