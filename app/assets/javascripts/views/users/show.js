GoodSees.Views.UserShow = Backbone.CompositeView.extend({

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.reels(), 'add remove', this.render);
  },

  events: {
    'click li.reel-display a.reel-name' : 'changeReel',
    'click button.add-new-reel' : 'createReel',
    'click button.feature-reel' : 'changeFeaturedReel',
    'click ul.reel-list a.delete-reel' : 'deleteReel'
  },

  template: JST['users/show'],

  render: function () {
    this.currentReel = this.currentReel || this.model.get('featured_id');

    var displayedReel = this.model.reels().get(this.currentReel);
    if (!displayedReel) {
      return this;
    }
    var content = this.template({user: this.model});
    this.$el.html(content);
    this.$('ul.reel-list a[reel-id="' + this.currentReel + '"]').addClass('displayed-reel');
    this.renderFilms(displayedReel);
    this.$('section.reel-films').prepend($('<button>FEATURE THIS REEL</button>').addClass('feature-reel'));
    return this;
  },


  changeReel: function () {
    event.preventDefault();
    var reelId = $(event.target).attr('reel-id');
    this.currentReel = reelId;
    this.model.fetch();
  },

  renderFilms: function (reel) {
    reel.films().each(this.addFilm.bind(this));
  },

  addFilm: function (film) {
    var filmView = new GoodSees.Views.FilmShow({
      userReels: this.model.reels(),
      model: film,
      rating: this.model.ratings().findWhere({'film_id' : film.id})
    });
    this.addSubview('ul.films-list', filmView)
  },

  createReel: function () {
    var view = this;
    event.preventDefault();
    var name = $('.new-reel-name').val();
    $('button.add-new-reel').prop('disabled', true);

    this.model.reels().create({
      name: name,
      custom: true
    },{wait : true,
      success: function () {
        $('button.add-new-reel').prop('disabled', false);
      },
      error: function (err) {
        alert('Invalid Reel Name');
        $('button.add-new-reel').prop('disabled', false);
      }
    });

  },

  changeFeaturedReel: function () {
    this.model.set({featured_id: this.currentReel});
    this.model.save();
  },

  deleteReel: function () {
    var view = this;
    event.preventDefault();
    var reelId = $(event.target).attr('reel-id')
    var reel = this.model.reels().get($(event.target).attr('reel-id'));
    view.model.reels().remove({id: reelId}).destroy();
  }
});
