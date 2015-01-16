GoodSees.Views.SignIn = Backbone.View.extend({

  initialize: function (options) {
    this.$el.addClass('sign-in');
    this.callback = options.callback;
    this.listenTo(GoodSees.currentUser, "signIn", this.signInCallback);
  },

  tagName: 'section',

  events: {
    "submit form" : "submit"
  },

  template: JST['layouts/sign_in'],

  render: function () {
    this.$el.html(this.template());

    return this;
  },

  submit: function (event) {
    event.preventDefault();
    var $form = $(event.currentTarget);
    var formData = $form.serializeJSON().user;
    GoodSees.currentUser.signIn({
      username: formData.username,
      password: formData.password,
      error: function () {
        alert('Invalid login. Please try again!')
      }
    });
  },

  signInCallback: function (event) {
    if (this.callback) {
      this.callback();
    } else {
      Backbone.history.navigate("", {trigger: true});
    }
  }
});
