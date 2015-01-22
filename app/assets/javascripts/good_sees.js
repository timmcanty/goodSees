window.GoodSees = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    GoodSees.vent = _.extend({}, Backbone.Events);
    this.currentUser = new GoodSees.Models.CurrentUser();
    this.currentUser.fetch({
      success: function () {
        new GoodSees.Routers.Router({$rootEl : $('#main-content')});
        Backbone.history.start();
      }
    });
    this.headerView = new GoodSees.Views.Header();
    $('#body-header').html(this.headerView.render().$el);
    this.modalView = new GoodSees.Views.Modal({$el : $('#modal')});
  }
};
