(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GamesTableRow = Backbone.View.extend({
		
		template: JST["games/table_row"],
		
		tagName: "tr",
		
		initialize: function(){
			this.listenTo( this.model, "add", this.render)
		},

		render: function () {
			var renderedContent = this.template({ game: this.model });
			this.$el.html(renderedContent);
			return this;
		},
		
		

	});
})();