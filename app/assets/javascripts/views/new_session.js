/*global JST, HexApp, _*/

HexApp.Views.NewSession = HexApp.BaseModalView.extend({
	
    id: 'new-session',
	
    template: JST['modals/new_session'],
	// 
	// events: { "click .close-modal": "handleSubmit" },
	
	handleSubmit: function(event){	
		debugger
		this.teardown();
	}
	
 });