require([
  'app',

  // Routers, Views, Models, Collections
  'router',
  'views/shared/message-dialog',
  'models/connection',
  'models/user',

  'collections/connections'
], function(
  app,

  Router,
  MessageDialogView,
  ConnectionModel,
  UserModel,

  ConnectionsCollection
) {
  'use strict';

  window.app = app;

  app.user = new UserModel();
  app.messageDialog = new MessageDialogView();
  app.router = new Router();

  app.init();
  app.start();
});