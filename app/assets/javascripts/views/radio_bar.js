(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.RadioBar = Backbone.View.extend({
	
	template: JST["games/radio_bar"],
	
	tagName: "ul",
	
	className: "radio-bar",
	
	initialize: function(options) {
		this.gameNav = options.gameNav;
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
	
	
	next: function () {  this.gameNav.next();	},
	
	prev: function () {	this.gameNav.prev(); },
	
	start: function() { this.gameNav.jump(0); },
	
	last: function () { this.gameNav.jump(); }
	})
	
})();