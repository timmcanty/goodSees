GoodSees.Collections.Reels = Backbone.Collection.extend({
  url: 'api/reels',
  model: GoodSees.Models.Reel,

  initialize: function (model, options) {
    this.user = options.user;
  }
});
