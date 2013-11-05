require([
  'app',
  'router',
  'views/shared/dialog',
  'models/connection'
], function(
  app,

  Router,
  DialogView,
  ConnectionModel
) {
  'use strict';

  app.conn = new ConnectionModel();
  app.dialog = new DialogView();
  app.router = new Router();

  window.app = app;

  Backbone.on('navigate', function(route) {
    app.router.navigate(route, {
      trigger: true
    });
  });

  Backbone.history.start({
    pushState: false,
    root: app.root
  });
});