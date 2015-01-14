GoodSees.Views.FilmIndex = Backbone.CompositeView.extend({
  events: {
    'submit #film-add-form': 'findAndAddFilm',
    'submit #film-search' : 'searchFilms',
    'click #prev-page' : 'prevPage',
    'click #next-page' : 'nextPage'
  },

  initialize: function () {
    this._searchQuery = '';
    this._page = 1;
    this.listenTo(this.collection, "sync", this.render);
    this.$el.addClass('films-index-body')
  },

  template: JST['films/index'],

  render: function () {
    var content = this.template({
      films: this.collection,
      page: this._page,
      searchQuery: this._searchQuery,
      totalPages: this.collection._totalPages
      });
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
    this._page = 1;
    this._searchQuery = $(event.target).serializeJSON().search;
    this.collection.fetch({data: $.param({search: this._searchQuery}) });
  },

  prevPage: function () {
    event.preventDefault();
    if (this._page > 1) {
      this._page -= 1;
      this.collection.fetch({data: $.param({page: this._page, search: this._searchQuery })});
    }
  },

  nextPage: function () {
    event.preventDefault();
    if (this._page < this.collection._totalPages) {
      this._page += 1;
      this.collection.fetch({data: $.param({page: this._page, search: this._searchQuery })});
    }
  }

})
