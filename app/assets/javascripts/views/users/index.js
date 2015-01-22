GoodSees.Views.UserIndex = Backbone.CompositeView.extend({
  events: {
    'click button.accept-request' : 'acceptFriendRequest',
    'click button.send-request' : 'sendFriendRequest',
    'click button.delete-friendship' : 'deleteFriendship'
  },

  initialize: function () {
    this.$el.addClass('users-index');
    this.listenTo(this.collection, 'sync', this.render);
    this.listenTo(GoodSees.currentUser, 'signIn', this.render);
    this.listenTo(GoodSees.currentUser, 'signOut', this.logOut);
  },

  tagName: 'section',

  template: JST['users/index'],


  render: function () {
    var content = this.template({users: this.collection});
    this.$el.html(content);
    return this;
  },

  logOut: function () {
    this.$el.html('');
    return this;
  },

  sendFriendRequest: function () {
    event.preventDefault();
    var view = this;
    var userId = $(event.target).attr('user-id');

    $.ajax({
      url: '/api/users/' + userId + '/friendables',
      type: 'POST',
      dataType: 'json',
      success: function () {
        view.collection.fetch();
      },
      error: function () {
        alert('OHNO')
      }
    });

  },

  acceptFriendRequest: function () {
    event.preventDefault();
    var view = this;
    var userId = $(event.target).attr('user-id');

    $.ajax({
      url: '/api/friendables/' + userId,
      type: 'PUT',
      dataType: 'json',
      success: function () {
        view.collection.fetch();
      },
      error: function () {
        alert('OHNO')
      }
    });
  },

  deleteFriendship: function () {
    event.preventDefault();
    var view = this;
    var userId = $(event.target).attr('user-id');

    $.ajax({
      url: '/api/friendables/' + userId,
      type: 'DELETE',
      dataType: 'json',
      success: function () {
        view.collection.fetch();
      },
      error: function () {
        alert('OHNO');
        view.collection.fetch();
      }
    });
  }
})
