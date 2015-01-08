GoodSees.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  ratings: function () {
    if(!this._ratings) {
      this._ratings = new GoodSees.Collections.Ratings([], {user: this});
    }

    return this._ratings;
  },

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], {user: this});
    }

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

    return response;
  }
});
