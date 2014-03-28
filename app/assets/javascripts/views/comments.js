(function () {
	"use strict";
	/*global HexApp, Backbone, JST, $ */
	HexApp.Views.Comments = Backbone.CompositeView.extend({
	
		className: "comments-display",
	
		template: JST["comments/index"],
		
		events: { 
			"click .comment-move": "handleMoveClick",
			"submit .new-comment": "handleCommentSubmission",
			"click .edit-comment-button": "openEdit"
		},
		
	
		initialize: function (options) {
			this.gameNav = options.gameNav;
			//comments views added once on initialize since
			//this view is made only after fetch
			this.addContent();
			this.listenTo(this.collection, "add", this.addComment)
			this.listenTo(this.collection, "sync", this.fixScrollPosition)
		},
		
		openEdit: function(event){
			debugger
			var target = $(event.target);
			var comment = target.parents(".comment");
			comment.find(".edit-comment").toggleClass("hidden");
			comment.find(".show-comment").toggleClass("hidden");
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
			}))
		},
		
		handleMoveClick: function (event) {
			var move = $(event.target);
			var comment = move.parents(".comment");
			var tokens = comment.find(".token");
			var gameNav = this.gameNav;
			tokens.each(function(index, token){
				var data = $(token).data();
				gameNav[data.type](data.value);
				if ($(token).is(move)) {return false};
			});
		},
		
		handleCommentSubmission: function (event) {
			event.preventDefault();
			var form = $(event.target);
			var comment = this.collection.add(form.serializeJSON().comment);
			this.$("#body").val("");
			comment.save();
		},
		
		addComment: function (comment) {
			var subview = new HexApp.Views.Comment({ model: comment });
			this.addSubview(".comments-list", subview);
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