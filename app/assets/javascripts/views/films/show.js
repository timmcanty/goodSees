GoodSees.Views.FilmShow = Backbone.View.extend({

  events: {
    'change input.rating-change': 'changeRating',
    'dblclick .view-date-editable': 'activateDateChanger',
    'submit form' : 'updateDate',
    'click a.cancel' : 'deactivateDateChanger',

  },

  initialize: function (options) {
    this.$el.addClass('film-list-show')
    this.rating = options.rating;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.rating, 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/show'],

  render: function () {
    var content = this.template({ rating: this.rating, film: this.model});
    this.$el.html(content);
    this.$el.find('input.rating-change').val(this.rating.get('star_rating'));
    return this;
  },

  changeRating: function () {
    var view = this;
    this.rating.set({'star_rating' : $(event.target).val() });
    this.rating.save({}, {
      success: function () {
        view.rating.collection.user.fetch();
      }
    });
  },

  activateDateChanger: function () {
    $(event.target).addClass('hidden');
    $(event.target).parent().find('form').removeClass('hidden');
  },

  deactivateDateChanger: function () {
    this.$el.find('.view-display').removeClass('hidden');
    $(event.target).parent().addClass('hidden');
  },

  updateDate: function () {
    event.preventDefault();
    var newDate = $(event.target).serializeJSON().view_date;
    var view = this;
    this.rating.set({'view_date' : newDate });
    this.rating.save({}, {
      success: function () {
        view.rating.collection.user.fetch();
        view.deactiveDateChanger();
      }
    });
  },


});
