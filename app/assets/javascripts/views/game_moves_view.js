/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.GameMoves = Backbone.View.extend({
		
		template: JST["games/game_moves"],
		
		render: function () {
			var renderedContent = this.template({
				moves: this.model.get("moves")
			});
			this.$el.html(renderedContent);
			return this;
		}
		
	});
})();