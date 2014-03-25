window.HexApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	var router = new HexApp.Routers.Router({ $rootEl: $("#content") });
	HexApp.$modalEl = $("#modal");
	Backbone.history.start();
  }
};

$(document).ready(function(){
  HexApp.initialize();
});
