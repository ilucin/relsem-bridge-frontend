define([
  'app'
], function(
  app
) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'actionIndex'
    },

    actionIndex: function() {
      console.log('Hello World!');
    }

  });

  return Router;
});