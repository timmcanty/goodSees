GoodSees.Views.FilmShow = Backbone.View.extend({

  events: {
    'change input.rating-change': 'changeRating',
    'dblclick .view-date-editable': 'activateDateChanger',
    'submit form.date' : 'updateDate',
    'click .view-date-editable a.cancel' : 'deactivateDateChanger',
    'click a.edit-reels' : 'activateReelsChanger',
    'click form.change-reels a' : 'deactivateReelsChanger',
    'change form.change-reels input:checkbox' : 'toggleReel',
    'click form.change-reels input:radio' : 'toggleDefaultReel',
  },

  initialize: function (options) {
    this.$el.addClass('film-list-show')
    this.rating = options.rating;
    this.userReels = options.userReels;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.rating, 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/show'],

  render: function () {
    var content = this.template({
      rating: this.rating,
      film: this.model,
      userReels: this.userReels
    });

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

  activateReelsChanger: function () {
    this.$('.change-reels').removeClass('hidden');
  },

  deactivateReelsChanger: function () {
    this.$('.change-reels').addClass('hidden');
  },

  toggleReel: function () {
    var view = this;
    var reelId = $(event.target).val();
    if (event.target.checked) {
      $.ajax( {
        url: "/api/reels/" + reelId,
        type: 'PUT',
        data: {
          film_id: this.model.id,
          command: 'add'
        },
        success: function () {
          view.rating.collection.user.fetch();
        }
      });
    } else {
      $.ajax( {
        url: "/api/reels/" + reelId,
        type: 'PUT',
        data: {
          film_id: this.model.id,
          command: 'remove'
        },
        success: function () {
          view.rating.collection.user.fetch();
        }
      });
    }
  },

  toggleDefaultReel: function () {
    alert("!");
  }


});
