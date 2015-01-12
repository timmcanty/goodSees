GoodSees.Views.FilmIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['films/index'],

  render: function () {
    var content = this.template({films: this.collection});
    this.$el.html(content);
    return this;
  }
})
