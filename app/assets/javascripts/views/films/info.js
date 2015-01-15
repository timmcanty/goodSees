GoodSees.Views.FilmInfo = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['films/info'],

  render: function () {
    var view = this;
    var content = this.template({film: this.model});
    this.$el.html(content);
    this.$('#rating').raty({
      path: '/assets',
      score: this.model.userRating().get('star_rating'),
      click: function(score, event) {
        view.model._userRating.set({star_rating: score});
        view.model._userRating.save();
      }
    });
    return this;
  }
});
