/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	//This view can be closed, showing the comment body view, or open,
	//showing the edit form.
	HexApp.Views.Comment = Backbone.View.extend({
		
		tagName: "li",
		
		initialize: function () {
			this.listenTo(this.model, "sync", this.render);
			this.open = false;
		},
		
		className: "comment media",
		
		template: JST["comments/show"],

		render: function () {
			this.$el.empty();
			this.$el.attr("data-id", this.model.id);
			var renderedContent = this.template({ 
				comment: this.model
			});
			this.$el.append(renderedContent);
			if (this.open) {
				this.openAppend();
			} else {
				this.closedAppend();
			}

			this.$(".comment-username").tooltip()
			return this;
		},
		
		
		//The event which opens the comments is a delegated event of the
		//comments view, but the others are individual to the comments since
		//there will usually not be too many of these.
		openAppend: function (){
			this.events = {
				"submit": "updateComment",
				"click .cancel": "closeUp",
				'input textarea': "preview"
			};
			var editView = new HexApp.Views.CommentEdit ({ 
				model: this.model
			});
			this.$el.append(editView.render().$el);
			this.delegateEvents();
		},
		
		closedAppend: function () {
			this.events = {};
			var bodyView = new HexApp.Views.CommentBody ({ 
				model: this.model
			});
			this.$el.append(bodyView.render().$el);

			this.delegateEvents();
		},
		
		preview: function(){
			var text = this.$(".edit-input").val();
			var commentPreview = HexApp.commentInterpreter.exec(text);
			this.$(".preview-area").html(commentPreview);
			if (text) { 
				this.$(".preview-area").html(
					"<h5> preview: </h5>" + commentPreview
				);
				this.$("#submit").prop('disabled', false);
			} else {
				this.$("#submit").prop('disabled', true);
			}
		},
		
		closeUp: function () {
			this.open = false;
			this.render();
		},
		
		openUp: function () {
			this.open = true;
			this.render();
		},
		
		//handles edit submission
		updateComment: function(event){
			event.preventDefault();
			this.open = false;
			this.model.save({ 
				body: this.$(".edit-input").val(),
			},{
				error: function(model,response){
					alert(response.responseText)
				},
				patch: true,
				wait: true
			});
		},
		
		//handles delete submision
		deleteComment: function(){
			var that = this
			if (confirm("Are you sure you want to delete this comment?")) {
				this.model.destroy({
					wait: true,
					success: that.remove.bind(that),
					error: function(model, response) {
						alert(response.responseText)
					}
				})
			}
		}
		

		
	});
})();