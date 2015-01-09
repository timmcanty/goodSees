GoodSees.Collections.Reels = Backbone.Collection.extend({
  url: 'api/reels',
  model: GoodSees.Models.Reel,
  comparator: 'id',

  initialize: function (model, options) {
    this.user = options.user;
  },



});
