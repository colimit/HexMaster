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
		this.events = {};
	};


	HexApp.GameNav.prototype = {
		
		//this jumps to moveNum in the game moves list, and empties the fragment
		//if moveNum is not given, jumps to the end of the movelist
		jump: function (moveNum) {
			var board = this.board;
			board.clear();
			this.resetFragment();
			if (moveNum === 0) { return true;}
			this.gameMoves.every(function (move, index) {
				return ( !moveNum || index < moveNum) && board.handleMove(move);
			});
			this.setBaseMove( moveNum || this.gameMoves.length);
		},
		
		setBaseMove: function (baseMove) {
			this.baseMove = baseMove;
			this.trigger("setBaseMove", baseMove);
		},
		
	
		resetFragment: function () {
			this.fragment = [];
			this.trigger("clearFragment");
		},
		
		setFragmentMove: function (number, move) {
			this.fragment[number - 1] = move;
			this.trigger("setFragmentMove", number, move);
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
		
		
		//this adds a move to the navigation. If the fragme
		push: function(move) {
			if (this.board.handleMove(move)) {
				if (this.fragment.length === 0 && 
					this.gameMoves[this.moveNum] === move){
						this.setBaseMove(this.baseMove + 1);
				} else {
					this.setFragmentMove(this.activeNumber() + 1, move);
				}
			}
		},
		
		back: function() {
			
		},
		
		activeNumber: function () {
			var moveNum;
			this.fragment.forEach( function (move, i){ 
				if (move) { moveNum = i + 1; }
			});
			return moveNum || this.baseMove;
		}
		
	};
		
})();