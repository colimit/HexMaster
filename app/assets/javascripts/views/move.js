(function(){
	/*global HexApp, Backbone */
	"use strict";
	HexApp.Views.Move = Backbone.View.extend({
		tagName: "td",
		
		className: "move",
	
		initialize: function (options){
			this.setMove(options.move);
			this.number = options.number;
			var colorClass = (this.number % 2 === 0) ? "blue-move" : "red-move";
			this.$el.addClass(colorClass);			// 
			// this.$el.attr("data-number", this.number);
		},
		
		render: function () {
			var renderedContent = (this.move === "resign" ? "res." : this.move);
			this.$el.html(renderedContent);
			return this;
		},

		setMove: function (move) {
			if (move != this.move) { this.$el.attr("data-move", this.move); }
			this.move = move;
			if (move) { 
				this.$el.removeClass("blank");
			} else {
				this.$el.addClass("blank"); 
			}
		}
	
	
	});
})();