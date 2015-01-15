GoodSees.Views.FeedIndex = Backbone.View.extend({

  initialize: function (options) {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['activities/index'],

  render: function () {
    var content = this.template({activities: this.collection});
    this.$el.html(content);
    return this;
  }
});
