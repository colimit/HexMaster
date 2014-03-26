(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GamesIndex = Backbone.CompositeView.extend({
		
		template: JST["games/index"],
		
		initialize: function(){
			this.addSubview("#games-table", new HexApp.Views.GamesTable({
				collection:  HexApp.games
			}));
			this.addSubview("#lookup-form", new HexApp.Views.LookupForm());
		}

	});
})();