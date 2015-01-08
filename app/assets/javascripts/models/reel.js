GoodSees.Models.Reel = Backbone.Model.extend({
  urlRoot: 'api/reels',

  films: function () {
    if(!this._films) {
      this._films = new GoodSees.Collections.Films([], {reel: this});
    }

    return this._films
  },

  parse: function (response) {
    if(response.films) {
      this.films().set(response.films, {parse: true});
      delete response.films
    }

    return response;
  }
})
