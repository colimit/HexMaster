/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	//This view shows the comment body, and buttons below it if applicable.
	//Either this view or CommentEdit is shown at any given time by a comment,
	//depending on its state
	HexApp.Views.CommentBody = Backbone.View.extend({
		
		template: JST["comments/body"],
		
		className: "comment-body",

		render: function () {
			var renderedContent = this.template({
				text: HexApp.commentInterpreter.exec(this.model.escape("body")),
				comment: this.model
			})
			this.$el.html(renderedContent);
			return this;
		}
		

		
	});
})();