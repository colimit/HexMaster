(function(){
	"use strict";
	/*global _, XRegExp, HexApp, $ */

	var Tokenizer = function (){};


	Tokenizer.prototype.exec = function (input, outputCallback) {
		this.position = 0;
		this.input = input;
		this.outputCallback = outputCallback;
		//parser should be a function that returns a parser
		this.parser()();
	};


	//Works like backbone extend (from which it is mostly copied)
	//Allows the class to be subclassed using extend
	Tokenizer.extend = function(protoProps) {
		var parent = this;
		var child;
		if (protoProps && _.has(protoProps, 'constructor')) {
			child = protoProps.constructor;
		} else {
			child = function(){ return parent.apply(this, arguments); };
		}

		_.extend(child, parent);

		var Surrogate = function(){ this.constructor = child; };
		Surrogate.prototype = parent.prototype;
		child.prototype = new Surrogate();

		child.__super__ = parent.prototype;

		if (protoProps) _.extend(child.prototype, protoProps);

		return child;		
	};


	//returns a method that checks the input for a regexp, starting at the parse
	//position, then if found calls the callback with the resulting match,
	//outputs the return, updates the current position to the end of match
	// and returns true
	Tokenizer.prototype.tokenGetter = function(re, callback){
		var that = this;
		return function () {
			var match = XRegExp.exec(that.input, re, that.position, "sticky");
			if (match){
				that.position = match.index + match[0].length;
				that.outputCallback(callback(match));
				return true;
			}
		};
	};

	Tokenizer.prototype.or = function(){
		var args  = [].slice.call(arguments);
		return function(){
			return args.some(function(parser){ return parser(); });
		};
	};

	//returns a new parser that executes the old parser until false 
	Tokenizer.prototype.loop = function(parser) {
		return function() { while (parser()) {}};
	};

	var Interpreter = function(){};

	Interpreter.extend = Tokenizer.extend;

	Interpreter.prototype.startState = function(){};

	Interpreter.prototype.exec = function (input) {
		this.startState();
		this.tokenizer.exec(input, this.push.bind(this));
		return this.finish();
	};

	Interpreter.prototype.push = function (token) {
		this.handlers[token.type].call(this, token.attributes);
	};

	Interpreter.prototype.finish = function () { return this.state; };


	var HexTokenizer = Tokenizer.extend({
	
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


	HexApp.CommentInterpreter = Interpreter.extend({
		startState: function(){
			this.container = $("<div>");
			this.movelist = null;
		},
		
		finish: function(){ 
			if (this.movelist) { this.container.append(this.movelist); }
			return this.container.html();
		},

		tokenizer: new HexTokenizer(),
		
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

