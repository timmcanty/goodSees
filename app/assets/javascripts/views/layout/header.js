GoodSees.Views.Header = Backbone.View.extend({


  template: JST['layouts/header'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});