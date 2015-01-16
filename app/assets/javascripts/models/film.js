GoodSees.Models.Film = Backbone.Model.extend({
  urlRoot: '/api/films',

  toJSON: function() {
    var json = { film : _.clone( this.attributes ) }

    if (this._image) {
      json.film.image = this._image;
    }

    return json;
  },

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], { film : this});
    }

    return this._reels
  },

  userRating : function () {
    if(!this._userRating) {
      this._userRating = new GoodSees.Models.Rating({},{film : this});
    }

    return this._userRating
  },

  ratings : function () {
    if(!this._ratings) {
      this._ratings = new GoodSees.Collections.Ratings([], {film: this});
    }

    return this._ratings
  },

  parse: function (response) {
    if(response.reels) {
      this.reels().set(response.reels, {parse: true});
      delete response.reels;
    }
    if (response.rating) {
      this.userRating().set(response.rating, {parse: true});
      delete response.rating;
    }
    if (response.ratings) {
      this.ratings().set(response.ratings, {parse: true});
      delete response.ratings
    }
    return response;
  },

});
