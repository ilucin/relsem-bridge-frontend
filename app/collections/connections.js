define([
  'app',
  'collections/base',
  'models/connection'
], function(
  app,
  BaseCollection,
  ConnectionModel
) {
  'use strict';

  var ConnectionsCollection = BaseCollection.extend({
    model: ConnectionModel,

    initialize: function() {
      app.connections = this;
    },

    url: function() {
      return app.localMode ? 'mock/connections.json' : (app.apiRoot + 'endpoints');
    }

  });

  return ConnectionsCollection;
});