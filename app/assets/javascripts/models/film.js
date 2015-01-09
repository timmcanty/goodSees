GoodSees.Models.Film = Backbone.Model.extend({
  urlRoot: '/api/films',

  reels: function () {
    if(!this._reels) {
      this._reels = new GoodSees.Collections.Reels([], { film : this});
    }

    return this._reels
  },

  parse: function (response) {
    if(response.reels) {
      this.reels().set(response.reels, {parse: true});
      delete response.reels
    }

    return response;
  }

});
