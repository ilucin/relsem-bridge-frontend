define([
  'Backbone',
  'app'
], function(
  Backbone,
  app
) {
  'use strict';

  var UserModel = Backbone.Model.extend({

    login: function() {
      return true;
    },

    logout: function() {
      return true;
    }

  });

  return UserModel;
});