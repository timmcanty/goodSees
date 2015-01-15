GoodSees.Routers.Router = Backbone.Router.extend({

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this.collection = new GoodSees.Collections.Users();
    this.collection.fetch();
  },

  routes: {
    '' : 'showCurrentUsersFilms',
    'films' : 'filmsIndex',
    'films/:id' : 'filmShow',
    'users/new' : 'newUser',
    'users' : 'usersIndex',
    'users/films/:id' : 'showUserFilms',
    'users/:id' : 'showUserProfile',
    'search/:string' : 'searchSite',
    'session/new' : 'signIn'

  },

  filmsIndex: function () {

    var films = new GoodSees.Collections.Films([], {user: GoodSees.currentUser || null});
    films.fetch();
    var filmsIndexShow = new GoodSees.Views.FilmIndex({collection: films});
    this._swapView(filmsIndexShow)
  },

  filmShow: function (id) {
    var film = new GoodSees.Models.Film({id: id, user: GoodSees.currentUser || null});
    film.fetch();
    var filmShow = new GoodSees.Views.FilmInfo({model: film});
    this._swapView(filmShow);
  },

  showUserFilms: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userShow = new GoodSees.Views.UserShow({ model: user});
    this._swapView(userShow);
  },

  showCurrentUsersFilms: function () {
    var callback = this.showCurrentUsersFilms.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    GoodSees.currentUser.fetch();
    var userShow = new GoodSees.Views.UserShow({ model: GoodSees.currentUser});
    this._swapView(userShow);
  },

  showUserProfile: function (id) {
    var user = new GoodSees.Models.User({id: id});
    user.fetch();
    var userProfile = new GoodSees.Views.UserProfile({model: user});
    this._swapView(userProfile);
  },

  usersIndex: function () {
    var callback = this.usersIndex.bind(this);
    if (!this._requireSignedIn(callback)) { return; }

    var users = new GoodSees.Collections.Users();
    users.fetch();
    var userIndex = new GoodSees.Views.UserIndex({collection: users});
    this._swapView(userIndex);
  },

  searchSite: function (search) {
    var searchView = new GoodSees.Views.Search({search: search});
    this._swapView(searchView);
  },

  newUser: function () {
    if (!this._requireSignedOut()) { return; }

    var model = new this.collection.model();
    var formView = new GoodSees.Views.UsersCreate({
      collection: this.collection,
      model: model
    });
    this._swapView(formView);
  },

  signIn: function (callback) {
    if (!this._requireSignedOut(callback)) {return;}

    var signInView = new GoodSees.Views.SignIn({
      callback: callback
    });

    this._swapView(signInView);
  },

  _requireSignedIn: function(callback) {
    if (!GoodSees.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      this.signIn(callback);
      return false;
    }

    return true;
  },

  _requireSignedOut: function(callback) {
    if (GoodSees.currentUser.isSignedIn()) {
      callback = callback || this._goHome.bind(this);
      callback();
      return false;
    }

    return true;
  },

  _goHome: function () {
    Backbone.history.navigate("films", {trigger: true});
  },

  _swapView: function (view) {
    this._currentView && this._currentView.remove();
    this._currentView = view;
    this.$rootEl.html(view.render().$el)
  }
});
