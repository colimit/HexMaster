(function(){
	/*global HexApp JST*/
	"use strict";
	HexApp.Views.NewUser = HexApp.BaseModalView.extend({

		id: 'new-user',

		template: JST['modals/new_user'],

		// 
<<<<<<< HEAD
		events: { "submit form": "handleSubmit" },
=======
		events: { "submit form": "handleSubmit"	 },
>>>>>>> launch

		handleSubmit: function(event){
			event.preventDefault();
			var form = this.$("form");
<<<<<<< HEAD
			var user     = new HexApp.Models.User();
=======
			var user = HexApp.currentUser;
>>>>>>> launch
			var that = this;
			var data = form.serializeJSON();
			if (data.user.password === data.user.password_confirm){
				user.save(data, {
<<<<<<< HEAD
					success: function(model){
						HexApp.currentUser = model;
=======
					success: function(model){						// 
						// HexApp.currentUser = model;
>>>>>>> launch
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
 