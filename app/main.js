require([
    'app',
    'routers/main'
  ],

  function(
    app,

    Router
  ) {
    'use strict';

    app.router = new Router();

    Backbone.history.start({
      pushState: false,
      root: app.root
    });
  });