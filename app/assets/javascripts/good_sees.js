window.GoodSees = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new GoodSees.Models.CurrentUser();
    this.currentUser.fetch();
    var headerView = new GoodSees.Views.Header();
    $('#body-header').html(headerView.render().$el);
    new GoodSees.Routers.Router({$rootEl : $('#main-content')});
    Backbone.history.start();

  }
};
