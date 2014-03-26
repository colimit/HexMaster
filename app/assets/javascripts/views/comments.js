(function () {
	"use strict";
	/*global HexApp, Backbone, JST, $ */
	HexApp.Views.Comments = Backbone.CompositeView.extend({
	
		className: "comments-display",
	
		template: JST["comments/index"],
		
		events: { 
			"click .comment-move": "handleMoveClick",
			"submit .new-comment": "handleCommentSubmission"
		},
	
		initialize: function (options) {
			this.gameNav = options.gameNav;
			var that = this;
			//comments views added once on initialize since
			//this view is made only after fetch
			this.collection.each(function (comment){
				that.addSubview(".comments-list", new HexApp.Views.Comment({
					model: comment
				}));
			});
			this.addSubview(".new-comment", new HexApp.Views.NewComment({
				model: this.model
			}))
			this.listenTo(this.collection, "add", this.addComment)
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
			comment.save();
		},
		
		addComment: function (comment) {
			var subview = new HexApp.Views.Comment({ model: comment });
			this.addSubview(".comments-list", subview);
		}
		
	
	});
})();