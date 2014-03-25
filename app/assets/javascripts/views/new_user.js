HexApp.Views.NewUser = HexApp.BaseModalView.extend({
	
    id: 'new-user',
	
	//className: "modal-dialog",
	
    template: JST['modals/new_user'],
	
	// 
	events: { "submit form": "handleSubmit" },
	
	handleSubmit: function(event){
		event.preventDefault();
		var form = this.$("form");
		user = new HexApp.Models.User()
		var that = this;
		user.save(form.serializeJSON(), {
			success: function(model){
				HexApp.currentUser = model;
				that.teardown();
			},
			error: function(model, response){
				this.$(".error-message").addClass("alert alert-danger")
				this.$(".error-message").html(response.responseText);
			}
		});
	}
	
 });
 