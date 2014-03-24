(function () {
	"use strict";
	/*global HexApp, Backbone, JST, $ */
	HexApp.Views.Comments = Backbone.CompositeView.extend({
	
		tagName: "ul",
	
		className: "comments-list media-list list-group",
	
		template: JST["comments/index"],
		
		events: {"click .comment-move": "handleMoveClick"},
	
		initialize: function (options) {
			this.gameNav = options.gameNav;
			var that = this;
			this.collection.each(function (comment){
				that.addSubview("", new HexApp.Views.Comment({
					model: comment
				}));
			});
		},

		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.renderSubviews();
			return this;
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
		}
		
	
	});
})();