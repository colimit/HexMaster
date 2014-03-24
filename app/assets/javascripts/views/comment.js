/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.Comment = Backbone.View.extend({
		
		tagName: "li",
		
		initialize: function () {
			this.listenTo(this.model, "change", this.render)
		},
		
		className: "comment media",
		
		template: JST["comments/show"],

		render: function () {
			var renderedContent = this.template({ comment: this.model });
			this.$el.html(renderedContent);
			var body = this.model.escape("body");
			this.$(".media-body").append(HexApp.commentInterpreter.exec(body));
			return this;
		}
		
	});
})();