/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.Comment = Backbone.View.extend({
		
		tagName: "li",
		
		className: "comment media",
		
		template: JST["comments/show"],

		render: function () {
			var renderedContent = this.template({ comment: this.model });
			this.$el.html(renderedContent);
			return this;
		}
		
	});
})();