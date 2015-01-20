GoodSees.Views.Modal = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.$el = options.$el;
    this.active = false;
    this.listenTo(Backbone, "signIn", this.renderSignIn);
  },

  tagName: 'section',

  events: {
    "submit form.sign-in" : "submitSignIn",
    "click a.cancel" : 'closeModal',
    'click a.sign-up' : 'signUp',
    "click a.sign-in" : 'render',
    'submit form.sign-up' : 'submitSignUp',
    'click *' : 'console'
  },

  signInTemplate: JST['layouts/sign_in'],

  renderSignIn: function () {
    var signIn = new GoodSees.Views.SignIn()
    signIn.$el.addClass('modal-container');
    this.$el.html(signIn.render().$el);
    this.show();
  },

  show: function () {
    this.active = true
    this.$el.switchClass('inactive-modal', 'active-modal');
  },

  hide: function () {
    this.active = false
    this.$el.switchClass('active-modal','inactive-modal');
  },

  console: function (event) {
    if ($(event.target).hasClass('modal-container')) {
      this.hide();
    }
  }

});
