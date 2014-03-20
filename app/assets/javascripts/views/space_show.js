/*global HexApp, Backbone, JST*/
(function(){
	"use strict";
	HexApp.Views.SpaceShow = Backbone.View.extend({

		template: JST["spaces/show"],

		initialize: function (options){
			this.coord = options.coord;
			this.$el.attr("style", this.style());
			this.$el.addClass("hex-space");
			this.$el.attr("id", HexApp.coordToString(this.coord));
		},

		spaceTop: function () {
			return 11 + 24 * this.coord[0];
		},

		spaceLeft: function () {
			return 15 + 14 * this.coord[0] + 28 * this.coord[1];
		},

		setPiece: function(color) {
			this.$el.removeClass("red");
			this.$el.removeClass("blue");
			if (color) { this.$el.addClass(color); }
		},

		style: function() {
			var left = "left: " + this.spaceLeft() + "px;";
			var top  = "top: " + this.spaceTop() + "px;";
			return left + " " + top;
		},

		render: function () {
			var renderedContent = this.template({ piece: null });
			this.$el.html(renderedContent);
			return this;
		}

	});
})();