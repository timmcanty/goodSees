GoodSees.Collections.Ratings = Backbone.Collection.extend({
  url: 'api/ratings',
  model: GoodSees.Models.Rating,

  initialize: function (model, options) {
    this.user = options.user;
  }
});
