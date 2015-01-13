GoodSees.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  ratings: function () {
    if(!this._ratings) {
      this._ratings = new GoodSees.Collections.Ratings([], {user: this});
    }

    return this._ratings;
  },

  currentRatings: function () {
    if (!this._currentRatings) {
      this._currentRatings = new GoodSees.Collections.Ratings([], {user:  new GoodSees.Models.User({id: GoodSees.currentUser})});
    }

    return this._currentRatings;
  },

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], {user: this});
;    }

    return this._reels
  },



  parse: function (response) {
    if (response.ratings) {
      this.ratings().set( response.ratings, { parse: true});
      delete response.ratings;
    }
    if (response.reels) {
      this.reels().set( response.reels, { parse: true});
      delete response.reels;
    }
    if (response.current_ratings) {
      this.currentRatings().set( response.current_ratings, { parse: true});
      delete response.current_ratings;
    }

    return response;
  }
});
