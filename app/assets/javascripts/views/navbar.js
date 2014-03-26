HexApp.Views.NavBar = Backbone.View.extend({
	initialize: function(options) {
		this.listenTo(HexApp.currentUser, "change set", this.render)
	},
	
	template: JST["navbar"],
	
	events: {
		"click a.sign-out": "signOut",
		"click a.sign-in": "launchSignIn",
		"click a.sign-up": "launchSignUp"
	},
	
	
	launchSignIn: function(){
		new HexApp.Views.NewSession()
	},
	
	launchSignUp: function(){
		new HexApp.Views.NewUser()
	},
	
	render: function () {
		renderedContent = this.template( {user: HexApp.currentUser} );
		var form = new HexApp.Views.LookupForm()
		this.$el.html(renderedContent);
		this.$("#lookup-form").append(form.render().$el);
		return this;
	},
	
	signOut: function(){
		$.ajax({
			type: "DELETE",
			url: "/session",
			success: function(){
				HexApp.currentUser.clear();
			},
			error: function(argument1, argument2){
			}
		})		
	}
	
	
		
	
})