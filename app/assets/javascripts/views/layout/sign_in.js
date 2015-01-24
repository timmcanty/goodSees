GoodSees.Views.SignIn = Backbone.View.extend({

  initialize: function (options) {
    this.callback = options.callback;
    this.$el.addClass('sign-in');
    this.listenTo(GoodSees.currentUser, "signIn", this.signInCallback);
  },

  tagName: 'section',

  events: {
    "submit form.sign-in" : "submitSignIn",
    "click a.cancel" : 'closeModal',
    'click a.sign-up' : 'signUp',
    "click a.sign-in" : 'render',
    'submit form.sign-up' : 'submitSignUp',
    'click a.demo' : 'createDemoUser'
  },

  template: JST['layouts/sign_in'],
  signUpTemplate: JST['users/create'],

  render: function (event) {
    if (event) { event.preventDefault()};
    var view = this;
    this.$el.hide('fade',{},400,function () {
      view.$el.empty();
      view.$el.html(view.template);
      view.$el.show();
    });
    return this;
  },

  submitSignIn: function (event) {
    var view = this;
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
    GoodSees.currentUser.signIn({
      username: formData.username,
      password: formData.password,
      success: function () {
        $('#modal').switchClass('active-modal','inactive-modal',400,'swing', function () {
          view.$el.remove();
        });
      },
      error: function () {
        alert('Invalid login. Please try again!')
      }
    });

  },

  createDemoUser: function (event) {
    var view = this;
    this.undelegateEvents();
    $('form').addClass('working');
    $('body').addClass('wait');
    event.preventDefault();
    GoodSees.currentUser.fetch({
      url: 'auth/demo',
      success: function () {
        console.log('fetched')
        GoodSees.currentUser.signIn({
          username: GoodSees.currentUser.get('username'),
          password: 'funtime',
          success: function () {
            $('body').removeClass('wait');
            console.log('signed in')
            $('#modal').switchClass('active-modal','inactive-modal',400,'swing', function () {
              console.log('ready to start')
              view.$el.remove();
          });}
        });
    }
    });
  },

  destroy: function () {
    this.undelegateEvents();
    this.$el.removeData().unbind();
    this.remove();
    Backbone.View.prototype.remove.call(this);
  },

  signInCallback: function (event) {
    console.log('sic')
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate('signing-in');
      Backbone.history.navigate('', {trigger: true});
    }
  },

  closeModal: function (event) {
    event.preventDefault();
    this.$el.remove();
    $('#modal').switchClass('active-modal','inactive-modal');
  },

  signUp: function (event) {
    var view = this;
    event.preventDefault();
    var user = new GoodSees.Models.User
    this.$el.hide('fade',{},400,function () {
      view.$el.empty();
      view.$el.html(view.signUpTemplate({user: user}));
      view.$el.show();
    });

    return this;
  },

  submitSignUp: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;
    var user = new GoodSees.Models.User();
    user.set(userData);
    user.save({}, {
      success: function () {
        GoodSees.currentUser.fetch();
        Backbone.trigger('hideModal');
      },
      error: function (data) {
        alert("Invalid username and or password");
        view.$el.html(view.signUpTemplate({user: user}));
      }
    });
  }
});
