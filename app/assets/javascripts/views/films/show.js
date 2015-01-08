GoodSees.Views.FilmShow = Backbone.View.extend({

  initialize: function (options) {
    this.$el.addClass('film-list-show')
    this.rating = options.rating;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.rating, 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/show'],

  render: function () {
    var content = this.template({ rating: this.rating, film: this.model});
    this.$el.html(content);
    return this;
  }
});
