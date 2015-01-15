GoodSees.Models.Rating = Backbone.Model.extend({
  urlRoot: 'api/ratings',

  toJSON: function() {
    return { rating : _.clone( this.attributes ) }
  },

  parse: function (response) {
    return response;
  }
});
