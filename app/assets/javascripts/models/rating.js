GoodSees.Models.Rating = Backbone.Model.extend({
  urlRoot: 'api/ratings',

  toJSON: function() {
    return { rating : _.clone( this.attributes ) }
  },

  user: function () {
    if (!this._user) {
      this._user = new GoodSees.Models.User({}, {rating: this});
    }

    return this._user
  },

  parse: function (response) {
    if (response.user) {
      this.user().set(response.user, {parse: true});
    }
    return response;
  }
});
