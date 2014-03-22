HexApp.Views.Comments = Backbone.CompositeView.extend({
	
	tagName: "ul",
	
	className: "comments-list media-list",
	
	template: JST["comments/index"],
	
	initialize: function() {
		var that = this
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
	}
	
});