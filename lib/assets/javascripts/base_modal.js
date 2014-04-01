HexApp.BaseModalView = Backbone.View.extend({

    className: 'modal-dialog modal-sm',
	
    baseEvents: {
      'hidden.bs.modal': 'teardown',
	  'click .close-modal': 'teardown'
    },

	//Unlike other views, modal views take care of themselves. 
	//just create a new one
	//and it should handle the rest
    initialize: function(options) {
      // _(this).bindAll();

	  _.extend(this.events, this.baseEvents)
	  this.options = options;
      this.render();
	  this.launch();
    },


    teardown: function() {
      HexApp.$modalEl.modal("hide");
    },
	
    render: function() {
      this.$el.html(this.template(this.options));
      return this;
    },
	
	launch: function(){
		HexApp.$modalEl.html(this.el)
		HexApp.$modalEl.modal("show");
	}
	
	
 });