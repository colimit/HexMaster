(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GamesTable = Backbone.CompositeView.extend({
		
		template: JST["games/table"],
		
		tagName: "table",
		
		className: "table",
		
		initialize: function(){
			this.listenTo( this.collection, "add", this.addTableRow)
		},

		render: function () {
			var renderedContent = this.template();
			var that = this
			this.$el.html(renderedContent);
			this.collection.each(function(game){ that.addTableRow(game)});
			return this;
		},
		
		addTableRow: function(game){
			var view = new HexApp.Views.GamesTableRow({ model: game })
			view.render();
			this.addSubview("", view)
		}
		

	});
})();