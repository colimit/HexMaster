(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GamesIndex = Backbone.CompositeView.extend({
		
		template: JST["games/index"],
		
		initialize: function(){
			this.listenTo( this.collection,"add", this.render);
			this.addSubview("#moves-table", new HexApp.Views.GamesTable({
				games: this.collection
			}));
			this.addSubview("#lookup-form" new HexApp.Views.LookupForm());
		},

		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.renderSubviews();
			return this;
		}
		

	});
})();