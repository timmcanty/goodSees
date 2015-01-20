GoodSees.Views.FeedIndex = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(GoodSees.currentUser,'signIn', this.refresh);
    this.listenTo(GoodSees.currentUser,'signOut',this.close);
  },

  template: JST['activities/index'],

  render: function () {
    var content = this.template({activities: this.collection});
    this.$el.html(content);
    return this;
  },

  refresh: function () {
    this.collection.fetch();
  },

  close: function () {
    this.$el.html('');
  }
});
