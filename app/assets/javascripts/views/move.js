(function(){
	/*global HexApp, Backbone, $ */
	"use strict";
	HexApp.Views.Move = Backbone.View.extend({
		tagName: "li",
		
		template: "games/move",
		
		className: function () {
			var color = (this.number % 2 === 0) ? "blue" : "red"
			return color + " move " + "type"
		},
		
		attributes: function () {
			return {"data-number": this.number, "data-move": this.move}
		},
	
		initialize: function (options){
			debugger
			this.move = options.move;
			this.number = options.number;
			this.type = options.type;
		},
		
		render: function () {
			renderedContent = this.template({
				number: this.number,
				move: this.move
			})
			this.$el.html()
			return this;
		}
	
	
	});
})();