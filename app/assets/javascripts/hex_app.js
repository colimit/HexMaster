window.HexApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {  	// 
  	// HexApp.currentUser = new HexApp.Models.User();
	HexApp.router = new HexApp.Routers.Router({ $rootEl: $("#content") });
	HexApp.$modalEl = $("#modal");
	HexApp.games = new HexApp.Collections.Games();
	Backbone.history.start();
  }
};

$(document).ready(function(){
  HexApp.initialize();
});
