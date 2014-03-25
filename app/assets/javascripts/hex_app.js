window.HexApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	var router = new HexApp.Routers.Router({ $rootEl: $("#content") });
	HexApp.$modalEl = $("#modal");
	HexApp.games = new HexApp.Collections.Games();
	
	HexApp.games.fetch();
	Backbone.history.start();
  }
};

$(document).ready(function(){
  HexApp.initialize();
});
