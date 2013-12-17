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
    limit: app.attributesLimit,
    offset: app.attributesOffset,

    setRdfEntity: function(rdfEntity) {
      this.rdfEntity = rdfEntity;
    },

    setEndpoint: function(endpoint) {
      this.endpoint = endpoint;
    },

    setLimit: function(limit) {
      this.limit = limit;
      window.localStorage.setItem('attributesLimit', limit);
      this.fetch({
        reset: true
      });
    },

    setOffset: function(offset) {
      this.offset = offset;
      window.localStorage.setItem('attributesOffset', offset);
      this.fetch({
        reset: true
      });
    },

    fetch: function() {
      if (!this.rdfEntity || !this.endpoint) {
        throw 'RdfAttributesCollection must have its RdfEntityModel set before it can be fetched';
      }
      BaseCollection.prototype.fetch.call(this);
    },

    url: function() {
      return app.localMode ? 'mock/attributes.json' : (app.apiRoot + 'semantic/attributes?limit=' + this.limit + '&offset=' + this.offset + '&endpoint=' + this.endpoint + '&entity=' + this.rdfEntity.get('uri'));
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