GoodSees.Collections.Films = Backbone.Collection.extend( {
  url: 'api/films',
  model: GoodSees.Models.Film,

  initialize: function (model, options) {
    this.user = options.user;
    this.reel = options.reel;
  }
});
