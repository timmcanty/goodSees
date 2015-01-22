GoodSees.Views.Header = Backbone.View.extend({

  initialize: function () {
    this.listenTo(GoodSees.currentUser, 'signIn signOut sync', this.render)
  },

  events: {
    'click #header-submit' : 'search',
    'click a.sign-out' : 'logOut',
    'click a.sign-in' : 'signIn',
  },
  template: JST['layouts/header'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function () {
    var search = $('#header-search').val();
    Backbone.history.navigate('search/' + search, {trigger: true});
  },

  logOut: function (event) {
    event.preventDefault();
    GoodSees.currentUser.signOut({});
  },

  signIn: function (event) {
    event.preventDefault();
    GoodSees.vent.trigger('signIn');
  }
});
