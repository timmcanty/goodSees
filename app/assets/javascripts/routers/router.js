GoodSees.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    var headerView = new GoodSees.Views.Header();
    $('#body-header').html(headerView.render().$el);
  },

  routes: {
    '' : 'showCurrentUsersFilms',
    'films' : 'filmsIndex',
    'users' : 'usersIndex',
    'users/films/:id' : 'showUserFilms',
    'users/:id' : 'showUserProfile'

  },

  filmsIndex: function () {
    var films = new GoodSees.Collections.Films();
    films.fetch();
    var filmsIndexShow = new GoodSees.Views.FilmIndex({collection: films});
    this.$rootEl.html(filmsIndexShow.render().$el);
  },

  showUserFilms: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userShow = new GoodSees.Views.UserShow({ model: user});
    this.$rootEl.html(userShow.render().$el);
  },

  showCurrentUsersFilms: function () {
    this.showUserFilms(GoodSees.currentUser);
  },

  showUserProfile: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userProfile = new GoodSees.Views.UserProfile({model: user});
    this.$rootEl.html(userProfile.render().$el);
  },

  usersIndex: function () {
    var users = new GoodSees.Collections.Users();
    users.fetch();
    var userIndex = new GoodSees.Views.UserIndex({collection: users});
    this.$rootEl.html(userIndex.render().$el);
  }
});
