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

    setEndpoint: function(endpoint) {
      this.endpoint = endpoint;
    },

    url: function() {
      return app.localMode ? 'mock/entities.json' : (app.apiRoot + 'semantic/entities?limit=' + app.entityLimit + '&offset=' + app.entityOffset + '&endpoint=' + this.endpoint);
    },

    fetch: function() {
      if (!this.endpoint) {
        throw 'RdfEntitiesCollection must have its endpoint set before it can be fetched';
      }
      BaseCollection.prototype.fetch.call(this);
    },

    parse: function(response) {
      return response.entities;
    }

  });

  return RdfEntitiesCollection;
});