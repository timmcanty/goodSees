GoodSees.Models.Film = Backbone.Model.extend({
  urlRoot: '/api/films',

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], { film : this});
    }

    return this._reels
  },

  currentUserRating : function (rating) {
    if (rating) {
      this._currentUserRating = rating
    }
    if(!this._currentUserRating) {
      this._currentUserRating = new GoodSees.Models.Rating([], {film : this});
    }

    return this._currentUserRating
  },

  parse: function (response) {
    if(response.reels) {
      this.reels().set(response.reels, {parse: true});
      delete response.reels
    } else if (response.rating) {
      this.currentUserRating().set(response.rating, {parse: true});
    }

    return response;
  }

});
