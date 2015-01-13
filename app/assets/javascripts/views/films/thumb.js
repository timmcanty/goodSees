GoodSees.Views.FilmThumbShow = Backbone.View.extend({

  events: {
    'click button.want-to' : 'wantToWatch'
  },

  initialize: function (options) {
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.userRating(), 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/thumb'],

  render: function () {
    var view = this;
    var content = this.template({film: this.model, rating: this.model.userRating()});
    this.$el.html(content);
    if (!GoodSees.currentUser) {
      this.$('button').prop('disabled', true);
    }
    this.$('#film-' + this.model.id).raty({
      path: '/assets',
      readOnly: function () {
        return !GoodSees.currentUser || (view.model.collection.user.id != GoodSees.currentUser)
      },
      score: this.model.userRating().get('star_rating') || 0,
      click: function (score, event) {
        view.submitRating(score);
      }
    });
    return this;
  },

  submitRating: function (score) {
    this.model.userRating().set({
      id: this.model.userRating().id,
      film_id: this.model.id,
      star_rating: score
    });
    this.model.userRating().save();
  },

  wantToWatch: function () {
    this.model.userRating().set({
      film_id: this.model.id,
    });
    this.model.userRating().save();
    this.$('button.want-to').addClass('hidden');
  }

});

// $.ajax( {
//   url: "/api/reels/" + reelId,
//   type: 'PUT',
//   data: {
//     film_id: this.model.id,
//     command: 'add'
//   },
//   success: function (data) {
//     var reel = view.model.reels().add(data);
//     var numberOfFilms = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().match(/\((.+)\)/)[1];
//     var newHtml = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().replace(/\((.+)\)/, '(' + (parseInt(numberOfFilms)+1) + ')');
//     $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html(newHtml);
//     view.render();
//   }
// });
