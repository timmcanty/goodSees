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
    console.log(this.$el);
    this.$el.addClass('film-thumb-show group')
    var view = this;
    var content = this.template({film: this.model, rating: this.model.userRating()});
    this.$el.html(content);
    if (!GoodSees.currentUser.isSignedIn) {
      this.$('button').prop('disabled', true);
    }
    this.$('#film-' + this.model.id).raty({
      path: '/assets',
      readOnly: function () {
        return !GoodSees.currentUser.isSignedIn() || (view.model.collection.user.id != GoodSees.currentUser.id)
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
