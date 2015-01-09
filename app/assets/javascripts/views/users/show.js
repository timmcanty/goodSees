GoodSees.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  events: {
    'click li.reel-display a' : 'changeReel',
    'click button.add-new-reel' : 'createReel',
    'click a.edit-reels' : 'activateReelsChanger'
  },

  template: JST['users/show'],

  render: function () {
    this.currentReel = this.currentReel || this.model.get('featured_id');

    var displayedReel = this.model.reels().get(this.currentReel)

    if (!displayedReel) {
      return this;
    }
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.renderFilms(displayedReel);
    return this;
  },

  changeReel: function () {
    event.preventDefault();
    var reelId = $(event.target).attr('reel-id');
    if (reelId != this.currentReel) {
      this.currentReel = reelId;
      this.render();
    }
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
  },

  createReel: function () {
    var view = this;
    event.preventDefault();
    var name = $('.new-reel-name').val();
    console.log(name);
    $('button.add-new-reel').prop('disabled', true);

    this.model.reels().create({
      name: name,
      custom: true
    },{wait : true,
      success: function () {
        $('button.add-new-reel').prop('disabled', false);
        view.render();
      },
      error: function (err) {
        alert('Invalid Reel Name');
        $('button.add-new-reel').prop('disabled', false);
      }
    });

  }
});
