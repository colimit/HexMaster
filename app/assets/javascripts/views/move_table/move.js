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
			this.$el.addClass(colorClass);		
		},
		
		render: function () {
			var renderedContent = (this.move === "resign" ? "res." : this.move);
			this.$el.html(renderedContent);
			return this;
		},

		setMove: function (move) {
			if (move != this.move) { this.$el.attr("data-move", this.move); }
			this.move = move;
			move ? this.$el.removeClass("blank") : this.$el.addClass("blank"); 
		}
	
	
	});
})();