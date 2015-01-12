GoodSees.Views.UserProfile = Backbone.CompositeView.extend({
  events: {
    'dblclick li.name label' : 'showEditName',
    'blur li.name input': 'updateName',
    'dblclick li.location label' : 'showEditLocation',
    'blur li.location input': 'updateLocation'
  },

  template: JST['users/profile'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    var reel = this.model.reels().get(this.model.get('featured_id'));
    if (!reel) {
      return this;
    }
    var content = this.template({user: this.model, reel: reel});
    this.$el.html(content);
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

  a: function () {
    console.log(event.target);
  }


});
