GoodSees.Views.FilmShow = Backbone.View.extend({

  initialize: function (options) {
    this.rating = options.rating;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.rating, 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/show'],

  render: function () {
    console.log('subviewrender')
    var content = this.template({ rating: this.rating, film: this.model});
    this.$el.html(content);
    return this;
  }
});
