
Backbone.CompositeView = Backbone.View.extend({
	
	addSubview: function (selector, view) {
		var selectorSubviews = 
			this.subviews()[selector] || (this.subviews()[selector] = []);
		selectorSubviews.push(view);
		
		var $selectorEl = this.$(selector);
		$selectorEl.append(view.$el);
	},
	
	renderSubviews: function () {
		var that = this;
		
		_(this.subviews()).each(function(selectorSubviews, selector){
			var $selectorEl = that.$(selector);
			$selectorEl.empty(); 
			_(selectorSubviews).each(function (subview) {
				$selectorEl.append(subview.render().$el);
				subview.delegateEvents();
			});
		});
	},
	
	clearSubviews: function(selector){
		this.subviews()[selector] = []
		var $selectorEl = this.$(selector);
		$selectorEl.empty();
	},
	
	subviews: function () {
		if (!this._subviews) {
			this._subviews = {};
		}
		return this._subviews;
	}
});