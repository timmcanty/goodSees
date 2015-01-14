GoodSees.Views.Header = Backbone.View.extend({

  events: {
    'click #header-submit' : 'search'
  },
  template: JST['layouts/header'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  search: function () {
    var search = $('#header-search').val();
    Backbone.history.navigate('search/' + search, {trigger: true});
  }
});
