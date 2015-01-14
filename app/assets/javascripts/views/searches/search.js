GoodSees.Views.Search = Backbone.View.extend({


  initialize: function (options) {
    this.searchResults = new GoodSees.Collections.SearchResults();
    if (options.search) {
      this.searchFor(options.search);
      }
    this.listenTo(this.searchResults, "sync", this.render);
  },

  events: {
    "click .search": "search",
    "click .next-page": "nextPage"
  },

  template: JST["layouts/search"],

  render: function () {
    var content = this.template({collection: this.searchResults});
    this.$el.html(content);

    this.renderSearchResults();

    return this;
  },

  renderSearchResults: function () {
    var container = this.$(".search-results");
    console.log(this.searchResults);
    this.searchResults.each(function (model) {
      var template;
      if (model.escape('username')) {
        console.log('user')
        template = JST["users/search_item"]
      } else {
        console.log('film')
        template = JST["films/search_item"]
      }
      container.append(template({model: model}));
    });
  },

  search: function (event) {
    event.preventDefault();
    this.searchResults._query = this.$(".query").val();
    this.searchResults.fetch({
      data: {query: this.searchResults._query}
    });
  },

  searchFor: function (query) {
    this.searchResults._query = query;
    this.searchResults.fetch({
      data: {query: query}
    });
  },

  nextPage: function (event) {
    this.searchResults.fetch({
      data: {
        query: this.searchResults._query,
        page: (this.searchResults._page || 1) + 1
      }
    });
  }

});
