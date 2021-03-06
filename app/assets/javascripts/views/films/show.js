GoodSees.Views.FilmShow = Backbone.View.extend({

  events: {
    'dblclick .view-date-editable': 'activateDateChanger',
    'submit form.date' : 'updateDate',
    'click .view-date-editable a.cancel' : 'deactivateDateChanger',
    'click a.edit-reels' : 'activateReelsChanger',
    'click form.change-reels a' : 'deactivateReelsChanger',
    'change form.change-reels input:checkbox' : 'toggleReel',
    'click form.change-reels input:radio' : 'toggleDefaultReel',
  },

  initialize: function (options) {
    this.$el.addClass('film-list-show group')
    this.userReels = options.userReels;
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.model.userRating(), 'sync', this.render);
  },

  tagName: 'li',

  template: JST['films/show'],

  render: function () {
    var view = this;
    var content = this.template({
      rating: this.model.userRating(),
      film: this.model,
      userReels: this.userReels
    });
    this.$el.html(content);
    this.$('#rating-'+this.model.userRating().id).raty({
      path: '/assets',
      score: this.model.userRating().get('star_rating'),
      click: function(score, event) {
        view.changeRating(score);
      }
    });
    this.$('#other-rating-'+this.model.userRating().id).raty({
      path: '/assets',
      readOnly: true,
      score: this.model.userRating().get('star_rating')
    });
    if (this.formOpen) {
      this.$('.change-reels').removeClass('hidden');
    }
    this.model.reels().each( function (reel) {
      view.$('form.change-reels input[value=' + reel.id + ']').attr('checked', true);
    });

    this.$el.find('input.rating-change').val(this.model.userRating().get('star_rating'));
    return this;
  },

  changeRating: function (score) {
    var view = this;
    this.model.userRating().set({'star_rating' : score });
    this.model.userRating().save({}, {
      success: function () {
        view.model.collection.user.fetch();
      }
    });
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
    this.model.userRating().set({'view_date' : newDate });
    this.model.userRating().save({}, {
      success: function () {
        view.model.collection.user.fetch();
        view.deactiveDateChanger();
      }
    });
  },

  activateReelsChanger: function () {
    event.preventDefault();
    this.formOpen = true;
    this.$('.change-reels').removeClass('hidden');
  },

  deactivateReelsChanger: function () {
    event.preventDefault();
    this.formOpen = false;
    this.$('.change-reels').addClass('hidden');
  },

  toggleReel: function () {
    event.preventDefault();
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
        success: function (data) {
          var reel = view.model.reels().add(data);
          var numberOfFilms = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().match(/\((.+)\)/)[1];
          var newHtml = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().replace(/\((.+)\)/, '(' + (parseInt(numberOfFilms)+1) + ')');
          $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html(newHtml);
          view.render();
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
        success: function (data) {
          view.model.reels().remove(data);
          var numberOfFilms = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().match(/\((.+)\)/)[1];
          var newHtml = $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html().replace(/\((.+)\)/, '(' + (parseInt(numberOfFilms)-1) + ')');
          $('ul.reel-list a.reel-name[reel-id="' + data.id +'"]').html(newHtml);
          view.render();
        }
      });
    }
  },

  toggleDefaultReel: function () {
    event.preventDefault();
    var view = this;
    var addId = $(event.target).val();

    $.ajax( {
      url: "/api/reels/" + addId,
      type: 'PUT',
      data: {
        film_id: this.model.id,
        command: 'default'
      },
      success: function (data) {
        view.model.reels().add(data[0]);
        var numberOfFilms = $('ul.reel-list a.reel-name[reel-id="' + data[0].id +'"]').html().match(/\((.+)\)/)[1];
        var newHtml = $('ul.reel-list a.reel-name[reel-id="' + data[0].id +'"]').html().replace(/\((.+)\)/, '(' + (parseInt(numberOfFilms)+1) + ')');
        $('ul.reel-list a.reel-name[reel-id="' + data[0].id +'"]').html(newHtml);
        view.model.reels().remove(data[1]);
        numberOfFilms = $('ul.reel-list a.reel-name[reel-id="' + data[1].id +'"]').html().match(/\((.+)\)/)[1];
        newHtml = $('ul.reel-list a.reel-name[reel-id="' + data[1].id +'"]').html().replace(/\((.+)\)/, '(' + (parseInt(numberOfFilms)-1) + ')');
        $('ul.reel-list a.reel-name[reel-id="' + data[1].id +'"]').html(newHtml);
        view.render();
      }
    });


  }


});
