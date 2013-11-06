require([
  'app',
  'router',
  'views/shared/dialog',
  'models/connection',
  'models/user'
], function(
  app,

  Router,
  DialogView,
  ConnectionModel,
  UserModel
) {
  'use strict';

  app.conn = new ConnectionModel();
  app.user = new UserModel();
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