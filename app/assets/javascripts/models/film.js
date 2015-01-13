GoodSees.Models.Film = Backbone.Model.extend({
  urlRoot: '/api/films',

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], { film : this});
    }

    return this._reels
  },

  userRating : function () {
    if(!this._userRating) {
      this._userRating = new GoodSees.Models.Rating([], {film : this});
    }

    return this._userRating
  },

  parse: function (response) {
    if(response.reels) {
      this.reels().set(response.reels, {parse: true});
      delete response.reels;
    }
    if (response.rating) {
      this.userRating().set(response.rating[0], {parse: true});
      delete response.rating;
    }
    return response;
  }

});
