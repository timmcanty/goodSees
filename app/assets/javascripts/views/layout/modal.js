GoodSees.Views.Modal = Backbone.CompositeView.extend({

  initialize: function (options) {
    this.$el = options.$el;
    this.active = false;
    this.listenTo(GoodSees.vent, "signIn", this.renderSignIn);
  },

  tagName: 'section',

  events: {
    "submit form.sign-in" : "submitSignIn",
    'click a.sign-up' : 'signUp',
    "click a.sign-in" : 'render',
    'submit form.sign-up' : 'submitSignUp',
    'click *' : 'clickedOutside'
  },

  signInTemplate: JST['layouts/sign_in'],

  renderSignIn: function (callback) {
    this.view && this.view.destroy();
    var signIn = new GoodSees.Views.SignIn({callback: callback});
    this.view = signIn;
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

  clickedOutside: function () {
    if ($(event.target).parent()[0] == this.$el[0]) {
      this.hide();
    }
  }

});
