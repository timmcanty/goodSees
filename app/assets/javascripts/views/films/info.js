GoodSees.Views.FilmInfo = Backbone.View.extend({

  events : {
    'dblclick .view-date-editable': 'activateDateChanger',
    'submit form.date' : 'updateDate',
    'click .view-date-editable a.cancel' : 'deactivateDateChanger',
    'dblclick section.review-editable, section.review-editable > p' : 'activateReviewChanger',
    'click button.update-review' : 'updateReview'
  },

  initialize: function () {
    this.listenTo(this.model, 'sync', this.render);
  },

  template: JST['films/info'],

  render: function () {
    console.log(this.model)
    var view = this;
    var content = this.template({film: this.model});
    this.$el.html(content);
    this.$('#rating').raty({
      path: '/assets',
      score: this.model.userRating().get('star_rating'),
      click: function(score, event) {
        view.model.userRating().set({star_rating: score, film_id: view.model.id});
        view.model.userRating().save();
        view.model.fetch();
      }
    });
    this.$('div.other-user-rating').raty({
      path: '/assets',
      score: function () {
        return $(this).attr('star-rating');
      },
      readOnly: true,
    });
    return this;
  },

  activateDateChanger: function () {
    $(event.target).addClass('hidden');
    $(event.target).parent().find('form').removeClass('hidden');
  },

  deactivateDateChanger: function () {
    event.preventDefault();
    this.$el.find('.view-display').removeClass('hidden');
    $(event.target).parent().addClass('hidden');
  },

  updateDate: function () {
    event.preventDefault();
    var newDate = $(event.target).serializeJSON().view_date;
    var view = this;
    this.model.userRating().set({'view_date' : newDate, 'film_id' : this.model.id });
    this.model.userRating().save({}, {
      success: function () {
        view.model.fetch();
        view.deactivateDateChanger();
      }
    });
  },

  activateReviewChanger: function () {
    event.preventDefault();
    $(event.target).find('p').addClass('hidden');
    $(event.target).find('textarea').removeClass('hidden');
    $(event.target).find('button').removeClass('hidden');
  },

  deactivateReviewChanger: function () {
    event.preventDefault();
    $(event.target).find('p').removeClass('hidden');
    $(event.target).find('textarea').addClass('hidden');
    $(event.target).find('button').addClass('hidden');
  },

  updateReview: function () {
    event.preventDefault();
    var view = this;
    var review = this.$('textarea').val()
    this.model.userRating().set({'review' : review, film_id: this.model.id});
    this.model.userRating().save({},{
      success: function () {
        view.model.fetch();
        view.deactivateReviewChanger();
      }
    });
  }


});
