require([
  'app',

  // Routers, Views, Models, Collections
  'router',
  'views/shared/message-dialog',
  'models/user',
], function(
  app,

  Router,
  MessageDialogView,
  UserModel
) {
  'use strict';

  window.app = app;

  app.user = new UserModel();
  app.messageDialog = new MessageDialogView();
  app.router = new Router();

  app.init();
  app.start();
});