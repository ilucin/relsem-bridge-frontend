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

  var RdfAttributesCollection = BaseCollection.extend({
    model: RdfEntityModel,
    limit: app.attributeLimit,
    offset: app.attributeOffset,

    setRdfEntity: function(rdfEntity) {
      this.rdfEntity = rdfEntity;
    },

    setEndpoint: function(endpoint) {
      this.endpoint = endpoint;
    },

    fetch: function() {
      if (!this.rdfEntity || !this.endpoint) {
        throw 'RdfAttributesCollection must have its RdfEntityModel set before it can be fetched';
      }
      BaseCollection.prototype.fetch.call(this);
    },

    url: function() {
      return app.localMode ? 'mock/attributes.json' : (app.apiRoot + 'semantic/attributes?limit=' + app.attributeLimit + '&offset=' + app.attributeLimit + '&endpoint=' + this.endpoint + '&entity=' + this.rdfEntity.get('uri'));
    },

    parse: function(response) {
      return response.attributes;
    },

    getRdfEntityUri: function() {
      return this.rdfEntity.get('uri');
    }

  });

  return RdfAttributesCollection;
});