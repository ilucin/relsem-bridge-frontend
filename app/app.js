define([
  // Libraries.
  'jquery',
  'underscore',
  'backbone',
  'helpers',
  // Self initializable plugins
  'bootstrap',
  'jqueryui'
], function(
  $,
  _,
  Backbone,
  helpers
) {
  'use strict';

  var app = {
    apiRoot: '/service/',
    serverIp: 'http://54.194.77.228:8080',
    // serverIp: 'http://54.229.166.21:8080',
    root: '',
    devMode: true,
    localMode: true,
    helpers: helpers,
    ajaxSetup: {}
  };

  _.extend(app, {

    init: function() {
      this.initAppMode();

      var server = this.helpers.getUrlParameterByName('server');
      this.serverIp = server || this.serverIp;
      this.apiRoot = this.serverIp + this.apiRoot;

      $.ajaxSetup(app.ajaxSetup);

      $(document).ajaxError(app.onAjaxError);
      $(document).ajaxSend(app.onAjaxSend);
      $(document).ajaxComplete(app.onAjaxComplete);

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
    },

    onAjaxSend: function(e, xhr, options) {},

    onAjaxComplete: function(e, xhr, options) {},

    onAjaxError: function(e, xhr, settings, error) {
      var messages = {
        404: 'Requested resource doesn\'t exist.',
        0: 'Network action timeout. Please repeat the last action.'
      };
      var message = 'Error ' + xhr.status;
      var clb;
      settings = settings || {};

      console.log('App.onAjaxError() -> xhr status: ' + xhr.status);

      if (messages.hasOwnProperty(xhr.status)) {
        message = messages[xhr.status];
      }

      if (!settings.silent) {
        app.messageDialog.showErrorMessage('Server error', message, clb);
      }

      Backbone.trigger('ajax:error', xhr, settings, error);
    }

  });

  // Localize or create a new JavaScript Template object.
  var JST = window.JST = window.JST || {};

  return app;

});