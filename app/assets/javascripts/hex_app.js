window.HexApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
	var router = new HexApp.Routers.Router({ $rootEl: $("#content") });
	Backbone.history.start();
  }
};

$(document).ready(function(){
  HexApp.initialize();
});
