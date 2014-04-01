(function () {
	"use strict";
	/*global Backbone, _ */
	Backbone.CompositeView = Backbone.View.extend({
	
		addSubview: function (selector, view) {
			var selectorSubviews = 
				this.subviews()[selector] || (this.subviews()[selector] = []);
			selectorSubviews.push(view);
			if (selector) {
				var $selectorEl = this.$(selector);
			} else {
				var $selectorEl = this.$el;
			}
			$selectorEl.append(view.$el);
		},
		
	
		renderSubviews: function () {
			var that = this;
			_(this.subviews()).each(function(selectorSubviews, selector){
				var $selectorEl = selector ? that.$(selector) : that.$el;
				$selectorEl.empty(); 
				_(selectorSubviews).each(function (subview) {
					$selectorEl.append(subview.render().$el);
					subview.delegateEvents();
				});
			});
		},
	
		clearSubviews: function(selector){
			this.subviews()[selector] = [];
			var $selectorEl = this.$(selector);
			$selectorEl.empty();
		},
	
		subviews: function () {
			if (!this._subviews) { this._subviews = {}; }
			return this._subviews;
		},
		
		render: function () {
			var renderedContent = this.template();
			this.$el.html(renderedContent);
			this.renderSubviews();
			return this;
		},
		
		closeAllSubviews: function () {
			var that = this
			_(this.subviews()).each(function(selectorSubviews, selector){
				that.subviews()[selector] = [];
				var $selectorEl = that.$(selector);
				$selectorEl.empty();
				_(selectorSubviews).each(function (subview) {
					if (subview.close) { subview.close() }
				});
			});
		},
		
		close: function (){
			this.remove();
			this.closeAllSubviews();
		}
	});
})();