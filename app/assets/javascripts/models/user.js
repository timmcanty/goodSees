GoodSees.Models.User = Backbone.Model.extend({
  urlRoot: 'api/users',

  toJSON: function() {
    var json = {user: _.clone(this.attributes)};

    if (this._image) {
      json.user.image = this._image;
    }

    return json;
  },

  ratings: function () {
    if(!this._ratings) {
      this._ratings = new GoodSees.Collections.Ratings([], {user: this});
    }

    return this._ratings;
  },

  currentRatings: function () {
    if (!this._currentRatings) {
      this._currentRatings = new GoodSees.Collections.Ratings([], {user: GoodSees.currentUser});
    }

    return this._currentRatings;
  },

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], {user: this});
    }

    return this._reels
  },

  friends: function () {
    if(!this._friends) {
      this._friends = new GoodSees.Collections.Users();
    }

    return this._friends
  },



  parse: function (response) {
    if (response.friends) {
      this.friends().set( response.friends, {parse: true});
      delete response.friends;
    }
    if (response.reels) {
      this.reels().set( response.reels, { parse: true});
      delete response.reels;
    }
    return response;
  }
});
