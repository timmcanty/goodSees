GoodSees.Collections.SearchResults = Backbone.Collection.extend({

  url: "api/search",

  model: function (attrs) {
    var type = attrs._type;
    delete attrs._type;

    if (type === "User") {
      return new GoodSees.Models.User(attrs);
    } else {
      return new GoodSees.Models.Film(attrs);
    }
  },

  parse: function (resp) {
    this._page = resp._page;

    return resp.results;
  }

});
