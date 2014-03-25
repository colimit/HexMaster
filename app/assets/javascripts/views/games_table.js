(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GamesTable = Backbone.View.extend({
		
		template: JST["games/table"],
		
		tagName: "table",
		
		className: "table",

		render: function () {
			var renderedContent = this.template({ games: this.collection });
			this.$el.html(renderedContent);
			return this;
		}
		

	});
})();