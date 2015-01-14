GoodSees.Collections.Films = Backbone.Collection.extend( {
  url: 'api/films',
  model: GoodSees.Models.Film,

  initialize: function (model, options) {
    this.user = options.user;
    this.reel = options.reel;
  },

  parse: function (resp) {
    if (resp.total_pages || resp.total_pages == 0) {
      this._totalPages = resp.total_pages;
      delete resp.total_pages
      return resp.films
    }
    return resp
  }
});
