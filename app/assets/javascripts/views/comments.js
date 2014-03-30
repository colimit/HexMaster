(function () {
	"use strict";
	/*global HexApp, Backbone, JST, _, $ */
	HexApp.Views.Comments = Backbone.CompositeView.extend({
	
		className: "comments-display",
	
		template: JST["comments/index"],
		
		events: { 
			"click .comment-move": "handleMoveClick",
			"submit .new-comment": "handleCommentSubmission",
			"click .edit-comment-button": "openEdit",
			"click .delete-comment-button": "deleteComment"
		},
		
	
		initialize: function (options) {
			this.gameNav = options.gameNav;
			//comments views added once on initialize since
			//this view is made only after fetch
			this.addContent();
			this.listenTo(this.collection, "add", this.addComment);
			this.listenTo(HexApp.currentUser, "change set", this.render);
		},
		
		findComment: function(element){
			var id = element.parents(".comment").data("id");
			var commentViews = this.subviews()[".comments-list"];
			return _.find(commentViews, function(view){
				//use coersion
				return id === view.model.id;
			});
		},
		
		openEdit: function(event){
			var element = $(event.target);
			this.findComment(element).openUp();
		},
		
		deleteComment: function(event){
			var element = $(event.target);
			this.findComment(element).deleteComment();
		},

		addContent: function () {
			var that = this;
			this.collection.each(function (comment){
				that.addSubview(".comments-list", new HexApp.Views.Comment({
					model: comment
				}));
			});
			this.addSubview(".new-comment", new HexApp.Views.NewComment({
				model: this.model,
				gameNav: this.gameNav
			}));
		},
		
		handleMoveClick: function (event) {
			var move = $(event.target);
			var comment = move.parents(".comment");
			var tokens = comment.find(".token");
			var gameNav = this.gameNav;
			gameNav.clearBranch();
			tokens.each(function(index, token){
				var data = $(token).data();
				gameNav[data.type](data.value);
				if ($(token).is(move)) {return false; }
			});
			gameNav.trigger("change");
		},
		
		handleCommentSubmission: function (event) {
			event.preventDefault();
			var form = $(event.target);
			var comment = this.collection.add(form.serializeJSON().comment);
			this.$("#body").val("");
			this.$(".new-comment .preview-area").empty();
			comment.save();
		},
		
		addComment: function (comment) {
			var subview = new HexApp.Views.Comment({ model: comment });
			this.addSubview(".comments-list", subview);
			subview.render();
			this.fixScrollPosition();
		},
		
		fixScrollPosition: function(){
			var tableBody = this.$(".comments-list");
			tableBody.scrollTop(1000000);
		},
		
		render: function () {
			if (this.model.get("result")){
				var renderedContent = this.template();
				this.$el.html(renderedContent);
				this.renderSubviews();
				return this;
			} else {
				this.$el.html("<h5> Game in progress </h5>");
				return this;
			}
		}
		
	
	});
})();