define([
  'app',
  'collections/base',
  'models/rdf-entity'
], function(
  app,
  BaseCollection,
  RdfEntityModel
) {
  'use strict';

  var RdfEntitiesCollection = BaseCollection.extend({
    model: RdfEntityModel,

    initialize: function() {
      app.rdfEntities = this;
    },

    url: function() {
      return app.localMode ? 'mock/entities.json' : (app.apiRoot + 'entities');
    }

  });

  return RdfEntitiesCollection;
});