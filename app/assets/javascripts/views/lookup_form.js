(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.LookupForm = Backbone.View.extend({
		
		template: JST["games/lookup_form"],
		
		tagName: "form",
		
		className: "form-inline",
		
		attributes: {role: "form"},
		
		events: {"submit" : "handleSubmit"},
		
		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			return this;
		},
		
		handleSubmit: function (event) {
			event.preventDefault()
			var number = $(event.target).find("#little_golem_id").val();
			HexApp.router.navigate('#/games/'+ number)
		}
		

	});
})();