define([
  // Libraries.
  'jquery',
  'underscore',
  'backbone',
  'helpers',
  // Self initializable plugins
  'bootstrap',
], function(
  $,
  _,
  Backbone,
  helpers
) {
  'use strict';

  var app = {
    apiRoot: 'http://localhost:80',
    root: '',
    devMode: true,
    localMode: true,
    helpers: helpers
  };

  _.extend(app, {

    init: function() {
      this.initAppMode();

      Backbone.on('navigate', function(route) {
        this.router.navigate(route, {
          trigger: true
        });
      });
    },

    start: function() {
      Backbone.history.start({
        pushState: false,
        root: this.root
      });
    },

    switchView: function(view) {
      var oldView = this.currentView;
      var viewEl;
      if (oldView && oldView.cleanup) {
        oldView.cleanup();
      }
      viewEl = view.render();
      $('#main').html(viewEl.el);
      this.currentView = view;
    },

    fetchTemplate: function(path) {
      var fullPath = 'app/templates/' + path + '.html';
      if (!JST[fullPath]) {
        $.ajax({
          url: app.root + fullPath,
          async: false,
          success: function(contents) {
            JST[fullPath] = _.template(contents);
          }
        });
      }
      return JST[fullPath];
    },

    initAppMode: function() {
      var dev = this.helpers.getUrlParameterByName('devMode');
      var local = this.helpers.getUrlParameterByName('localMode');
      this.devMode = dev === 'true';
      this.localMode = local === 'true';
    }

  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  return app;

});