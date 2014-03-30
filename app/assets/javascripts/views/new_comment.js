(function(){
	/*global HexApp, Backbone, JST, $*/
	"use strict";
	HexApp.Views.NewComment = Backbone.View.extend({
		
		initialize: function (options) {
			this.gameNav = options.gameNav;
			this.gameNav.on("change", this.update.bind(this));
		},
		
		tagName: "form",
		
		template: JST["comments/new"],
		
		events: { 'input textarea': "preview",
				  "click #insert-branch": "insertBranch",
		 		  "click .new-session": "newSession",
			  	  "click .new-user": "newUser"
			   },
			 
		preview: function(){
			var text = this.$("#body").val();
			var commentPreview = HexApp.commentInterpreter.exec(text);
			this.$(".preview-area").html(commentPreview);
			if (text) { 
				this.$(".preview-area").html(
					"<h5> preview: </h5>" + commentPreview
				);
				this.$("#submit").prop('disabled', false);
			} else {
				this.$("#submit").prop('disabled', true);
			}
		},
		
		render: function () {
			var renderedContent = this.template({ 
				game: this.model,
				user: HexApp.currentUser
			});
			this.$el.html(renderedContent);
			if (this.gameNav.branch.length === 0){
				this.$('#insert-branch').prop('disabled', true);
			}
			return this;
		},
		
		insertIntoText: function (string){
			var cursorPos = $('#body').prop('selectionStart');
			var v  = $('#body').val();
			var textBefore    = v.substring(0,  cursorPos );
			var textAfter     = v.substring( cursorPos, v.length );
			$('#body').val( textBefore+ string +textAfter );
		},

		insertBranch: function(){
			var branchString = this.gameNav.branchMovesString();
			if (branchString) {
				this.insertIntoText("|" + branchString);
			} else {
				alert("Branch is empty.");
			}
			this.preview();
		},
		
		update: function(){
			var branchExists = this.gameNav.branch.length > 0;
			this.$("#insert-branch").prop('disabled', !branchExists);
		},
		
		
		newSession: function(){ debugger; new HexApp.Views.NewSession(); },
		
		
		newUser: function(){ new HexApp.Views.NewUser(); }
		
	});
})();