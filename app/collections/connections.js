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

    url: function() {
      return app.localMode ? 'mock/connections.json' : (app.apiRoot + 'semantic/endpoints');
    }

  });

  return ConnectionsCollection;
});