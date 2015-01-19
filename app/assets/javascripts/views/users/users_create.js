GoodSees.Views.UsersCreate = Backbone.View.extend({

  initialize: function (options) {
    this.$el.addClass('users-create');
    this.listenTo(this.model, "sync change", this.render);
  },

  tagName: 'section',

  template: JST['users/create'],

  events: {
    "submit form" : "submit"
  },

  render: function () {
    var html = this.template({ user: this.model});
    this.$el.html(html);

    return this;
  },

  submit: function (event) {
    event.preventDefault();

    var $form = $(event.currentTarget);
    var userData = $form.serializeJSON().user;
    var that = this;
    var user = new GoodSees.Models.User()
    user.set(userData);
    user.save({}, {
      success: function () {
        GoodSees.currentUser.fetch();
        that.collection.add(that.model, {merge: true});
        Backbone.history.navigate("", {trigger: true});
      },
      error: function (data) {
        alert("Invalid username and or password");
      }
    });
  }
});
