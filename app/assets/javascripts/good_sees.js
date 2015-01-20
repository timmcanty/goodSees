window.GoodSees = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {

    this.currentUser = new GoodSees.Models.CurrentUser();
    this.currentUser.fetch();
    this.headerView = new GoodSees.Views.Header();
    $('#body-header').html(this.headerView.render().$el);
    this.modalView = new GoodSees.Views.Modal({$el : $('#modal')});
    new GoodSees.Routers.Router({$rootEl : $('#main-content')});
    Backbone.history.start();

  }
};
