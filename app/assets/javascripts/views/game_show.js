(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.GameShow = Backbone.CompositeView.extend({
		
		template: JST["games/show"],
		
		initialize: function () {
			var gameNav = this.gameNav = new HexApp.GameNav(this.model);
			var boardView = new HexApp.Views.BoardShow({ gameNav: gameNav });
			var movesView = new HexApp.Views.MoveTable({ gameNav: gameNav });
			var commentsView = new HexApp.Views.Comments({ 
				collection: this.model.comments(),
				model: this.model,
				gameNav: gameNav
			});
			this.addSubview("#game-display", boardView);
			this.addSubview("#game-display", movesView);
			this.addSubview("#comments", commentsView);
		},

		
		render: function () {
			var renderedContent = this.template({ game: this.model });
			this.$el.html(renderedContent);
			this.renderSubviews();
			return this;
		},
		
		reset: function () {
			this.gameNav.jump();
		},
		
		events: { "click .sign-in": "launchSignIn",
				  "click .sign-up": "launchSignUp"},
		
		launchSignIn: function(){
			new HexApp.Views.NewSession()
		},
		
		launchSignUp: function(){
			new HexApp.Views.NewUser()
		}
		
	});
})();