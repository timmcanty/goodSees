GoodSees.Models.Activity = Backbone.Model.extend({
  urlRoot: 'api/activities',

  user: function () {
    if (!this._user) {
      this._user = new GoodSees.Models.User()
    }

    return this._user
  },

  mentionable: function (options) {
    if (!this._mentionable) {
      if (options.response.title) {
        this._mentionable = new GoodSees.Models.Film();
      } else {
        this._mentionable = new GoodSees.Models.User();
      }
    }

    return this._mentionable
  },

  parse: function (response) {
    if (response.mentionable) {
      this.mentionable({response: response.mentionable}).set( response.mentionable, {parse: true});
      delete response.friends;
    }
    if (response.user) {
      this.user().set( response.user, { parse: true});
      delete response.user;
    }

    return response;
  }
});
