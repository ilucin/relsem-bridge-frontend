define([
    // Libraries.
    'jquery',
    'underscore',
    'backbone'
  ],

  function($, _, Backbone) {
    'use strict';

    var app = {
      apiRoot: 'mock',
      serverRoot: '',
      root: '',
      collections: {}
    };

    _.extend(app, {
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
      }

    });
    // Localize or create a new JavaScript Template object.
    var JST = window.JST = window.JST || {};

    return app;

  });