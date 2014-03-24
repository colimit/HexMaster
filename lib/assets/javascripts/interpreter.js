
Gerbe = {};

(function(){
	"use strict";
	/*global _, XRegExp, Gerbe */

	Gerbe.Parser = function (){};

	Gerbe.Parser.prototype.exec = function (input, outputCallback) {
		this.position = 0;
		this.input = input;
		//parser should be a function that returns a parser
		//parsers take an output channel and modify the state,
		//possibly sending data to the output channel.
		//they return true or false to indicate success or failure.
		return this.parser()(outputCallback);
	};

	//Works like backbone extend (from which it is mostly copied)
	//Allows the class to be subclassed using extend
	Gerbe.Parser.extend = function(protoProps) {
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

	//returns a parser that checks the input for a regexp, achored at the parse
	//position, then if found sends the resulting match to the output,
	// updates the current position to the end of match
	// and returns true
	Gerbe.Parser.prototype.tokenGetter = function(re){
		var that = this;
		return function (output) {
			var match = XRegExp.exec(that.input, re, that.position, "sticky");
			if (match){
				that.position = match.index + match[0].length;
				output(match);
				return true;
			}
		};
	};

	Gerbe.Parser.prototype.or = function(){
		var args  = [].slice.call(arguments);
		return function(output){
			return args.some(function(parser){ return parser(output); });
		};
	};

	//returns a new parser that executes the old parser until false 
	Gerbe.Parser.prototype.loop = function(parser) {
		return function(output) {
			var i = 0 
			while (parser(output)) { i++; }
			if (i > 0) { return true; }
		};
	};
	
	//returns a new parser whose output is processed through fn before being
	//sent to the output channel. 
	Gerbe.Parser.prototype.map = function(parser, fn){
		return function (output) {
			var newOutput = function() {
				var args = [].slice.call(arguments)
				return output(fn.apply(this, args))
			}
			return parser(newOutput);
		}
	}
	
	//An interpreter reads tokens from a parser in the form of objects with
	//{type: token_type, attributes: { <token data> } }, and processes
	//a token by calling the appropriate handler for the token type
	// in it's handler object, passing the attributes as an argument
	Gerbe.Interpreter = function(){};

	Gerbe.Interpreter.extend = Gerbe.Parser.extend;

	Gerbe.Interpreter.prototype.startState = function(){};

	Gerbe.Interpreter.prototype.exec = function (input) {
		this.start();
		this.tokenizer.exec(input, this.push.bind(this));
		return this.finish();
	};

	Gerbe.Interpreter.prototype.push = function (token) {
		this.handlers[token.type].call(this, token.attributes);
	};

	Gerbe.Interpreter.prototype.finish = function () { return this.state; };
	
})();