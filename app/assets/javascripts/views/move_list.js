(function(){
	/*global HexApp, Backbone, $ */
	"use strict";
	HexApp.Views.BoardShow = Backbone.View.extend({
	
		initialize: function (options){
			this.board = options.board;
			this.size = this.board.size;
			this.$el.addClass("hex-board" + this.size);
			this.makeSpaces();
			this.affixSpaces();
			this.board.on("setHex", this.setSpace.bind(this));
		},
	
	
	});
})();