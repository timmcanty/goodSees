GoodSees.Views.UserIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['users/index'],


  render: function () {
    var content = this.template({users: this.collection});
    this.$el.html(content);
    return this;
  }
})
