/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
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