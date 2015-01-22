GoodSees.Views.Search = Backbone.View.extend({


  initialize: function (options) {
    this.$el.addClass('search-page');
    this.searchResults = new GoodSees.Collections.SearchResults();
    if (options.search) {
      this.searchFor(options.search);
      }
    this.listenTo(this.searchResults, "sync", this.render);
  },

  events: {
    "click .search": "search"
  },

  template: JST["layouts/search"],

  render: function () {
    console.log('render')
    console.log(this.searchResults);
    var content = this.template({collection: this.searchResults});
    this.$el.html(content);

    this.renderSearchResults();

    return this;
  },

  renderSearchResults: function () {
    var view = this;
    this.searchResults.each(function (model) {
      var template;
      if (model.escape('username')) {
        var container = view.$(".user-results");
        template = JST["users/search_item"];
        container.append(template({model: model}));
      } else {
        var container = view.$('.film-results');
        template = JST["films/search_item"];
        container.append(template({model: model}));
      }
    });
  },

  search: function (event) {
    event.preventDefault();
    this.searchResults._query = this.$(".query").val();
    Backbone.history.navigate('search/' + this.searchResults._query);
    this.searchResults.fetch({
      data: {query: this.searchResults._query}
    });
  },

  searchFor: function (query) {
    console.log('searchFor')
    this.searchResults._query = query;
    console.log(query)
    this.searchResults.fetch({
      data: {query: query}
    });
  }

});
