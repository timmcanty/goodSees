GoodSees.Views.FilmIndex = Backbone.View.extend({

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
  },

  template: JST['films/index'],

  render: function () {
    var content = this.template({films: this.collection});
    this.$el.html(content);
    this.collection.forEach( function (film) {
      console.log(film.get('star_rating'))
      this.$('#film-' + film.id).raty({
        path: '/assets',
        score: film.get('star_rating'),
      })
    });
    return this;
  }
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
