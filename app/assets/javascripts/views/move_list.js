(function(){
	/*global HexApp, Backbone, $ */
	"use strict";
	HexApp.Views.MoveList = Backbone.View.extend({
		
		initialize: function() {
			that = this
			that.moveViews = []
			this.model.get("moves").forEach( function(move, index){
				that.moves.push(new HexApp.Views.Move({
					move: move, 
					number: index + 1 
				}))
			});
		},
	
		tagName: "li",
		
		className: "game-moves",
		
		render: function() {
			this.moveViews.forEach( function(moveView){
				this.$el.append(moveView.render().$el)
			})
			return this
		}
	
	});
})();