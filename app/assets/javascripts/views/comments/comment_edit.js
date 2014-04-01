/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	//This view shows the comment edit form, and buttons.
	//Either this view or CommentBody is shown at any given time by a comment,
	//depending on its state
	HexApp.Views.CommentEdit = Backbone.View.extend({

		template: JST["comments/edit"],
		
		className: "comment-edit",

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