GoodSees.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  template: JST['users/show'],

  render: function (model, obj, opts, reelId) {
    reelId = reelId || this.model.get('featured_id');
    var content = this.template({user: this.model});
    var firstReel = this.model.reels().get(reelId)
    if (!firstReel) {
      return this;
    }
    this.$el.html(content);
    this.renderFilms(firstReel);
    return this;
  },

  renderFilms: function (reel) {
    reel.films().each(this.addFilm.bind(this));
  },

  addFilm: function (film) {
    var filmView = new GoodSees.Views.FilmShow({
      model: film,
      rating: this.model.ratings().findWhere({'film_id' : film.id})
    });
    this.addSubview('ul.films-list', filmView)
  }
});
