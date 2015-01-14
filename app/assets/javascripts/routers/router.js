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
    'users/:id' : 'showUserProfile',
    'search/:string' : 'searchSite'

  },

  filmsIndex: function () {
    var currentUser = new GoodSees.Models.User({id: GoodSees.currentUser});
    var films = new GoodSees.Collections.Films([], {user: currentUser});
    films.fetch();
    currentUser.fetch();
    var filmsIndexShow = new GoodSees.Views.FilmIndex({collection: films});
    this._swapView(filmsIndexShow)
  },

  showUserFilms: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userShow = new GoodSees.Views.UserShow({ model: user});
    this._swapView(userShow);
  },

  showCurrentUsersFilms: function () {
    this.showUserFilms(GoodSees.currentUser);
  },

  showUserProfile: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userProfile = new GoodSees.Views.UserProfile({model: user});
    this._swapView(userProfile);
  },

  usersIndex: function () {
    var users = new GoodSees.Collections.Users();
    users.fetch();
    var userIndex = new GoodSees.Views.UserIndex({collection: users});
    this._swapView(userIndex);
  },

  searchSite: function (search) {
    var searchView = new GoodSees.Views.Search({search: search});
    this._swapView(searchView);
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
});
