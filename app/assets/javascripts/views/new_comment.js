(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.NewComment = Backbone.View.extend({
		
		tagName: "form",
		
		template: JST["comments/new"],
		
		render: function () {
			var renderedContent = this.template({ game: this.model });
			this.$el.html(renderedContent);
			return this;
		}
		
	});
})();