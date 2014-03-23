(function(){
	"use strict";
	/*global _, XRegExp, Gerbe, $ */

	HexApp.HexTokenizer = Gerbe.Parser.extend({
	
		parser: function (){
			var pipeProcessor = function() {
				return { type: "pipe", attributes: {} };
			};
	
			var moveProcessor = function(match) {
				return { type: "move", 
					attributes: { number: match[1], move: match[2] }
				};
			};
	
			var textProcessor = function(match) {
				return { type: "text", attributes: { text: match[1] }};
			};
	
			var pipeMatcher = /\|\s?/;
	
			var moveMatcher = /(\d+)\.\s*([a-t]1?\d)\s?/;
	
			var textMatcher = /([\s\S]+?)(?=\||\d+\.\s*[a-t]1?\d\s?|$)/;
		
			return this.loop(this.or( 
				this.tokenGetter(pipeMatcher, pipeProcessor),
				this.tokenGetter(moveMatcher, moveProcessor),
				this.tokenGetter(textMatcher, textProcessor)
			));
		
		}
	});


	HexApp.CommentInterpreter = Gerbe.Interpreter.extend({
		startState: function(){
			this.container = $("<div>");
			this.movelist = null;
		},
		
		finish: function(){ 
			if (this.movelist) { this.container.append(this.movelist); }
			return this.container.html();
		},

		tokenizer: new HexApp.HexTokenizer(),
		
		pipeSpan: function(){
			return $("<span>").addClass("comment-pipe").html(" | ");
		},
		
		moveLi: function(move, number){
			var element = $("<li>").addClass("comment-move");
			element.attr("data-move", move);
			element.html("" + number + "." + move);
			if (number % 2 === 0) {
				element.addClass("blue-move");
			} else {
				element.addClass("red-move");
			}
			return element;
		},
		
		moveUl: function(number){
			var element = $("<ul>").addClass("comment-move-list");
			element.attr("data-number", number);
			return element;
		},

		handlers: {
	
			pipe: function() {
				if (this.movelist) this.container.append(this.movelist());
				this.container.append(this.pipeSpan());
				this.movelist = null;
			},
	
			move: function(attributes) {
				var move = attributes.move;
				var number = attributes.number;
				this.movelist = this.movelist || this.moveUl(number);
				this.movelist.append(this.moveLi(move, number));
			},
	
			text: function(attributes) {
				if (this.movelist) this.container.append(this.movelist);
				if (this.container.html() && attributes.text[0] != ".") {
					this.container.append(" ");
				}
				this.container.append(attributes.text);
				this.movelist = null;
			}
	
		}
	
	});
	
	HexApp.commentInterpreter = new HexApp.CommentInterpreter();
	
})();

