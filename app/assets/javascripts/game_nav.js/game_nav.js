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
		this.gameMoves = this.game.get("moves");
		this.fragment = [];
		this.baseMove = 0;
		this.board = board;
		this.jump();
	};


	HexApp.GameNav.prototype = {
		
	}
		
		
	
	};
})();