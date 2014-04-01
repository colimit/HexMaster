/*global HexApp, Backbone */
(function(){
	"use strict";
	HexApp.Views.LabelShow = Backbone.View.extend({

		initialize: function (options){
			this.coord = options.coord;
			this.$el.attr("style", this.style());
			this.$el.addClass("hex-label");
			this.$el.attr("id", HexApp.coordToString(this.coord));
			//labels do not change so are rendered once on initialize
			this.render();
		},

		spaceTop: function () {
			var isRank = (this.coord[1] === -1 ? 1 : 0 )
			return 7 + 24 * this.coord[0] + isRank * 10
		},

		spaceLeft: function () {
			var isFile = (this.coord[0] === -1 ? 1 : 0 )
			return 12 + 14 * this.coord[0] + 28 * this.coord[1] + isFile * 15;
		},

		style: function () {
			var left = "left: " + this.spaceLeft() + "px;";
			var top  = "top: " + this.spaceTop() + "px;";
			return left + " " + top;
		},

		render: function () {
			if (this.coord[0] === -1){
				this.$el.html(this.file());
				this.$el.addClass("file-label");
			} else if (this.coord[1] === -1) {
				this.$el.html(this.rank());
				this.$el.addClass("rank-label");
			}
			return this;
		},
		
		file: function () {
			return String.fromCharCode(97 + this.coord[1]);
		},
		
		rank: function(){
			var rank = this.coord[0] + 1;
			return (rank < 10 ?  "&nbsp;"+ rank : rank)
		}

	});
})();