define([
  'backbone',
  'app',
  'views/home/home',
  'views/home/about',
  'views/editor/editor'
], function(
  Backbone,
  app,
  HomeView,
  EditorView,
  AboutView
) {
  'use strict';
  var Router = Backbone.Router.extend({
    routes: {
      '': 'actionIndex',
      'home': 'actionHome',
      'tables': 'actionTables',
      'editor': 'actionEditor',
      'about': 'actionAbout'
    },

    actionIndex: function() {
      this.actionHome();
    },

    actionHome: function() {
      var homeView = new HomeView();
      app.switchView(homeView);
    },

    actionTables: function() {
      return true;
    },

    actionEditor: function() {
      var editorView = new EditorView();
      app.switchView(editorView);
    },

    actionAbout: function() {
      var aboutView = new AboutView();
      app.switchView(aboutView);
    }

  });

  return Router;
});