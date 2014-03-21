(function(){
	/*global JST, HexApp, Backbone */
	"use strict";
	HexApp.Views.Move = Backbone.View.extend({
		tagName: "li",
		
		template: JST["games/move"],
		
		className: "move",
		
	
		initialize: function (options){
			this.move = options.move;
			this.number = options.number;
		},
		
		render: function () {
			var renderedContent = this.template({
				move: (this.move === "resign" ? "res." : this.move)
			});
			this.updateAttributes();
			this.$el.html(renderedContent);
			return this;
		},
		
		updateAttributes: function () {
			this.$el.removeClass("red-move blue-move");
			var colorClass = (this.number % 2 === 0) ? "blue-move" : "red-move";
			this.$el.addClass(colorClass);
			this.$el.attr("data-number", this.number);
			this.$el.attr("data-move", this.move);
		},
		
		select: function() {
			this.$el.addClass("selected");
		},
		
		unselect: function() {
			this.$el.removeClass("selected");
		},
		
		blank: function () {
			this.move = "";
			this.$el.addClass("blank");
			this.render();
		},
		
		setMove: function (move) {
			this.move = move;
			this.$el.removeClass("blank");
			this.render();
		}
	
	
	});
})();