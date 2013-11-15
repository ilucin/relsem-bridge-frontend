require([
  'app',

  // Routers, Views, Models, Collections
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

  window.app = app;
  app.init();

  app.conn = new ConnectionModel();
  app.user = new UserModel();
  app.dialog = new DialogView();
  app.router = new Router();

  app.start();
});