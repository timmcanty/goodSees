GoodSees.Views.FilmIndex = Backbone.CompositeView.extend({
  events: {
    'submit #film-add-form': 'findAndAddFilm',
    'submit #film-search' : 'searchFilms'
  },

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass('films-index-body')
  },

  template: JST['films/index'],

  render: function () {
    console.log('rendering')
    var content = this.template({films: this.collection});
    this.$el.html(content);
    this.renderFilms();

    return this;
  },

  renderFilms: function () {
    this.collection.each(this.addFilm.bind(this));
  },

  addFilm: function (film) {
    var filmView = new GoodSees.Views.FilmThumbShow({
      model: film
    });
    this.addSubview('ul.films-list', filmView);
  },

  findAndAddFilm: function () {
    var view = this;
    event.preventDefault();
    var title = $(event.target).serializeJSON().title;

    $.ajax({
      url: 'http://www.omdbapi.com/',
      type: 'GET',
      data: {
        plot : 'short',
        type: 'movie',
        r: 'json',
        t: title
      },
      success: function (response) {
        var data = JSON.parse(response);
        if (data.Response == 'True') {
          var film = new GoodSees.Models.Film({
            title: data.Title,
            imdb_url: ('http://www.imdb.com/title/' + data.imdbID),
            description: data.Plot,
            image: data.Poster
          });
          film.save([], {
            success: function (){
              view.collection.add(film);
              view.addFilm(film);
            },
            error: function () {
              alert('FILM ALREADY EXISTS');
            }
          });
        } else {
          alert('ERROR FILM NOT FOUND');
        }

      }
    })
  },

  searchFilms: function () {
    event.preventDefault();
    console.log('here')
    var formData = $(event.target).serializeJSON().search;
    this.collection.fetch({data: $.param({search: formData}) });
  }

})
