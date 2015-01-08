window.GoodSees = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

$(document).ready(function(){
  new GoodSees.Routers.Router({$rootEl : $('#main-content')});
  Backbone.history.start();
});
