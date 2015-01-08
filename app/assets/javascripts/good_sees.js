window.GoodSees = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
  }
};

$(document).ready(function(){
  console.log(GoodSees.current_user)
  new GoodSees.Routers.Router({$rootEl : $('#main-content')});
  Backbone.history.start();
});
