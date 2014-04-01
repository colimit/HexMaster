(function(){
	/*global HexApp JST*/
	"use strict";
	HexApp.Views.NewUser = HexApp.BaseModalView.extend({

		id: 'new-user',

		template: JST['modals/new_user'],

		// 
		events: { "submit form": "handleSubmit"	 },

		handleSubmit: function(event){
			event.preventDefault();
			var form = this.$("form");
			var user = HexApp.currentUser;
			var that = this;
			var data = form.serializeJSON();
			if (data.user.password === data.user.password_confirm){
				user.save(data, {
					success: function(model){						// 
						HexApp.navbar.refresh();
						that.teardown();
					},
					error: function(model, response){
						that.errorMessage(response.responseText);
					}
				});
			} else {
				that.errorMessage("Password doesn't match confirmation");
			}
		},
		
		errorMessage: function (message){
			this.$(".error-message").addClass("alert alert-danger");
			this.$(".error-message").html(message);
		}

	});

})();
 