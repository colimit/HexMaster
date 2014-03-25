/*global JST, HexApp, $*/

HexApp.Views.NewSession = HexApp.BaseModalView.extend({
	
    id: 'new-session',
	
    template: JST['modals/new_session'],
	// 
	events: { "submit form": "handleSubmit" },
	
	handleSubmit: function(event){
		event.preventDefault();	
		var form = this.$("form");
		session = new HexApp.Models.Session();
		var that = this;
		session.save(form.serializeJSON()["session"], {
			success: function(model){
				HexApp.currentUser.set(model.attributes);
				that.teardown();
			},
			error: function(model, response){
				this.$(".error-message").addClass("alert alert-danger")
				this.$(".error-message").html(response.responseText);
			}
		});
	}
	
 });