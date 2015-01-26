GoodSees.Views.FeedIndex = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(GoodSees.currentUser,'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(GoodSees.currentUser, 'signOut', this.render);
  },

  events: {
    'click section.welcome a' : 'signIn'
  },

  template: JST['activities/index'],

  render: function () {
    var content = this.template({activities: this.collection});
    this.$el.html(content);
    return this;
  },

  signIn: function (event) {
    event.preventDefault();
    GoodSees.vent.trigger('signIn');
  }

});
