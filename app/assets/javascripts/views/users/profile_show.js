GoodSees.Views.UserProfile = Backbone.CompositeView.extend({
  events: {
    'dblclick li.name label' : 'showEditName',
    'blur li.name input': 'updateName',
    'dblclick li.location label' : 'showEditLocation',
    'blur li.location input': 'updateLocation',
    'dblclick li.bday label': 'showEditBirthDay',
    'blur li.bday input' : 'updateBirthDay',
    'dblclick section.profile-bio p, h3': 'showEditBio',
    'blur section.profile-bio textarea': 'updateBio',
    "change #input-user-image" : "fileInputChange",
    'submit #input-user-image-form' : "submitNewImage"
  },

  template: JST['users/profile'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.$el.addClass('profile-show');
  },

  render: function () {
    var reel = this.model.reels().get(this.model.get('featured_id'));
    if (!reel) {
      return this;
    }
    var content = this.template({user: this.model, reel: reel});
    this.$el.html(content);
    this.renderFilms(reel);
    return this;
  },

  showEditName: function () {
    this.$('li.name input').removeClass('hidden');
    this.$('li.name label').addClass('hidden');
  },

  updateName: function () {
    var name = $(event.target).val();
    this.$('li.name label').removeClass('hidden');
    this.$('li.name input').addClass('hidden');
    this.model.set({name: name});
    this.model.save();
  },

  showEditLocation: function () {
    this.$('li.location input').removeClass('hidden');
    this.$('li.location label').addClass('hidden');
  },

  updateLocation: function () {
    var location = $(event.target).val();
    this.$('li.location label').removeClass('hidden');
    this.$('li.location input').addClass('hidden');
    this.model.set({location: location});
    this.model.save();
  },

  showEditBirthDay: function () {
    this.$('li.bday input').removeClass('hidden');
    this.$('li.bday label').addClass('hidden');
  },

  updateBirthDay: function () {
    var birthday = $(event.target).val();
    this.$('li.bday label').removeClass('hidden');
    this.$('li.bday input').addClass('hidden');
    this.model.set({birth_date: birthday});
    this.model.save();
  },

  showEditBio: function () {
    this.$('section.profile-bio textarea').removeClass('hidden');
    this.$('section.profile-bio p').addClass('hidden');
  },

  updateBio: function () {
    var bio = $(event.target).val();
    this.$('section.profile-bio p').removeClass('hidden');
    this.$('section.profile-bio textarea').addClass('hidden');
    this.model.set({bio: bio});
    this.model.save();
  },

  renderFilms: function (reel) {
    reel.films().each(this.addFilm.bind(this));
  },

  addFilm: function (film) {
    var filmView = new GoodSees.Views.FilmThumbShow({
      model: film,
      rating: this.model.ratings().findWhere({film_id: film.id}),
    });
    this.addSubview('ul.films-list', filmView);
  },

  fileInputChange: function(event){
    var that = this;
    var file = event.currentTarget.files[0];
    var reader = new FileReader();

    reader.onloadend = function(){
      that._updatePreview(reader.result);
      that.model._image = reader.result;

    }

    if (file) {
      reader.readAsDataURL(file);
    } else {
      this._updatePreview("");
      delete this.model._image;

    }
  },

  _updatePreview: function(src){
    this.$el.find("#preview-post-image").attr("src", src);
  },

  submitNewImage: function () {
    var view = this;
    event.preventDefault();
    this.model.save({}, {
      success: function(){
        delete view.model._image;
        view.render();
      }
    });

  }


});
