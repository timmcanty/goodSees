GoodSees.Views.FeedIndex = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(GoodSees.currentUser,'sync', this.render);
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(GoodSees.currentUser, 'signOut', this.removeDisplay);
  },

  template: JST['activities/index'],

  render: function () {
    var content = this.template({activities: this.collection});
    this.$el.html(content);
    return this;
  },

  removeDisplay: function () {
    this.$el.remove();
  }

});
