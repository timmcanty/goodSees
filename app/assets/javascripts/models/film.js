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

  parse: function (response) {
    if(response.reels) {
      this.reels().set(response.reels, {parse: true});
      delete response.reels;
    }
    if (response.rating) {
      console.log(response.rating)
      this.userRating().set(response.rating, {parse: true});
      delete response.rating;
    }
    return response;
  }

});
