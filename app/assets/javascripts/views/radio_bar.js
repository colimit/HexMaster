(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.RadioBar = Backbone.View.extend({
	
	template: JST["games/radio_bar"],
	
	tagName: "ul",
	
	className: "radio-bar",
	
	initialize: function(options) {
		this.gameNav = options.gameNav;
		this.gameNav.on("setCurrentMove", this.handleCurrentMove.bind(this))
	},
	
	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);
		return this;
	},
	
	events: {
		"click .radio-prev" : "prev",
		"click .radio-next" : "next",
		"click .radio-last": "last",
		"click .radio-start": "start"
	},
	
	handleCurrentMove: function(moveNum){
		this.$(".radio-prev").prop('disabled', true)
		this.$(".radio-last").prop('disabled', true)
		this.$(".radio-start").prop('disabled', true)
		this.$(".radio-next").prop('disabled', true)
		if (moveNum < this.gameNav.gameMoves.length) {
			this.$(".radio-last").prop('disabled', false)
			if (this.gameNav.branch.length === 0) {
				this.$(".radio-next").prop('disabled', false)
			}
		} 
		if (moveNum > 0 ){
			this.$(".radio-prev").prop('disabled', false)
			this.$(".radio-start").prop('disabled', false)
		}
	},
		
	
	
	next: function () {  this.gameNav.next();	},
	
	prev: function () {	this.gameNav.prev(); },
	
	start: function() { this.gameNav.jump(0); },
	
	last: function () { this.gameNav.jump(); }
	})
	
})();