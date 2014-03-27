(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.NewComment = Backbone.View.extend({
		
		initialize: function (options) {
			this.gameNav = options.gameNav;
			this.gameNav.on("clearBranch", this.disableInsert.bind(this) );
			this.gameNav.on("setBranchMove", this.enableInsert.bind(this));
		},
		
		disableInsert: function () {
			this.$('#insert-branch').prop('disabled', true);
		},
		
		enableInsert: function () {
			this.$('#insert-branch').prop('disabled', false);
		},
		
		tagName: "form",
		
		template: JST["comments/new"],
		
		events: {'input textarea': "preview",
				 "click #insert-branch": "insertBranch"},
				 
		preview: function(){
			var text = this.$("#body").val();
			var commentPreview = HexApp.commentInterpreter.exec(text)
			this.$(".preview-area").html(commentPreview);
			if (text) { 
				this.$(".preview-area").html(
					"<h5> preview: </h5>" + commentPreview
				);
				this.$("#submit").prop('disabled', false)
			} else {
				this.$("#submit").prop('disabled', true)
			}
		},
		
		render: function () {
			var renderedContent = this.template({ game: this.model });
			this.$el.html(renderedContent);
			if (this.gameNav.branch.length === 0){
				this.$('#insert-branch').prop('disabled', true);
			}
			this.$("#submit").prop('disabled', true)
			return this;
		},
		
		insertIntoText: function (string){
		    var cursorPos = $('#body').prop('selectionStart'),
		      v = $('#body').val(),
		      textBefore = v.substring(0,  cursorPos ),
		      textAfter  = v.substring( cursorPos, v.length );
		      $('#body').val( textBefore+ string +textAfter );
	  	},
		
		insertBranch: function(){
			var branchString = this.gameNav.branchMovesString()
			if (branchString) {
				this.insertIntoText("|" + branchString);
			} else {
				alert("Branch is empty.")
			}
			this.preview();
		}
		
	});
})();