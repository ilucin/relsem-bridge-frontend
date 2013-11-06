define([
  'backbone',
  'app',
  'views/navbar',
  'views/home/home',
  'views/home/about',
  'views/home/tables',
  'views/editor/editor'
], function(
  Backbone,
  app,
  NavbarView,
  HomeView,
  AboutView,
  TablesView,
  EditorView
) {
  'use strict';
  var Router = Backbone.Router.extend({

    initialize: function() {
      this.navbar = new NavbarView();
      app.user.on('logout', this.onLogout, this);
    },

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

    actionEditor: function() {
      var editorView = new EditorView();
      app.switchView(editorView);
    },

    actionAbout: function() {
      var aboutView = new AboutView();
      app.switchView(aboutView);
    },

    onLogout: function() {
      Backbone.trigger('navigate', '');
    }

  });

  return Router;
});