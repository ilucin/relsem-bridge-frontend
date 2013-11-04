require([
  'app',
  'router',
  'views/shared/dialog'
], function(
  app,

  Router,
  DialogView
) {
  'use strict';

  app.router = new Router();
  app.dialog = new DialogView();

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