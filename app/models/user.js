define([
  'backbone',
  'app'
], function(
  Backbone,
  app
) {
  'use strict';

  var UserModel = Backbone.Model.extend({

    defaults: {
      'username': '',
    },

    login: function(username, password) {
      if (username.length <= 0 || password.length <= 0) {
        return;
      }

      this.set({
        username: username
      });
      this.trigger('login');
    },

    logout: function() {
      this.clear();
      this.trigger('logout');
    }

  });

  return UserModel;
});