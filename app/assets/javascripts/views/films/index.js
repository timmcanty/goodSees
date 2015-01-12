GoodSees.Views.FilmIndex = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass('films-index-body')
  },

  template: JST['films/index'],

  render: function () {
    var content = this.template({films: this.collection});
    this.$el.html(content);
    this.renderFilms();

    return this;
  },

  renderFilms: function () {
    this.collection.each(this.addFilm.bind(this));
  },

  addFilm: function (film) {
    var filmView = new GoodSees.Views.FilmThumbShow({
      model: film
    });
    this.addSubview('ul.films-list', filmView);
  },

})

// this.$('#rating-'+this.rating.id).raty({
//   path: '/assets',
//   score: this.rating.get('star_rating'),
//   click: function(score, event) {
//     view.changeRating(score);
//   }
// });
// this.$('#other-rating-'+this.rating.id).raty({
//   path: '/assets',
//   readOnly: true,
//   score: this.rating.get('star_rating')
// });
