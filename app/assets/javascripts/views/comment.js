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
			
			var renderedContent = this.template({
				 comment: this.model,
			 	 name: this.model.escape("username") || "Guest"
			 });
			this.$el.html(renderedContent);
			this.$('.comment-username').tooltip()
			var body = this.model.escape("body");
			this.$(".comment-body").append(HexApp.commentInterpreter.exec(body));
			return this;
		}
		
	});
})();