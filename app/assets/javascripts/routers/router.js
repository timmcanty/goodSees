GoodSees.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
  },

  routes: {
    '' : 'showCurrentUsersFilms',
    'users/:id' : 'showUserFilms'
  },


  showUserFilms: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userShow = new GoodSees.Views.UserShow({ model: user});
    this.$rootEl.html(userShow.render().$el);
  },

  showCurrentUsersFilms: function () {
    this.showUserFilms(GoodSees.currentUser);
  }
});
