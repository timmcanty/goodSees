GoodSees.Views.UserIndex = Backbone.CompositeView.extend({
  events: {
    'click button.accept-request' : 'acceptFriendRequest',
    'click button.send-request' : 'sendFriendRequest',
    'click button.delete-friendship' : 'deleteFriendship'
  },

  initialize: function () {
    this.listenTo(this.collection, 'sync', this.render);
  },

  template: JST['users/index'],


  render: function () {
    var content = this.template({users: this.collection});
    this.$el.html(content);
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
