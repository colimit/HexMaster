/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
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