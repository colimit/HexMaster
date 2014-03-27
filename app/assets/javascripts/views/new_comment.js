(function(){
	/*global HexApp, Backbone, JST*/
	"use strict";
	HexApp.Views.NewComment = Backbone.View.extend({
		
		initialize: function (options) {
			this.gameNav = options.gameNav;
		},
		
		tagName: "form",
		
		template: JST["comments/new"],
		
		events: {'input textarea': "preview",
				 "click #insert-branch": "insertBranch"},
				 
		preview: function(){
			var text = this.$("#body").val();
			var commentPreview = HexApp.commentInterpreter.exec(text)
			this.$(".preview-area").html(commentPreview);
		},
		
		render: function () {
			var renderedContent = this.template({ game: this.model });
			this.$el.html(renderedContent);
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
			}
			this.preview();
		}
		
	});
})();