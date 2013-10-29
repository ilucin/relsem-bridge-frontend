define([
  'backbone',
  'app',
  'views/main'
], function(
  Backbone,
  app,
  MainView
) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'actionIndex'
    },

    actionIndex: function() {
      var mainView = new MainView();
      app.switchView(mainView);
    }

  });

  return Router;
});