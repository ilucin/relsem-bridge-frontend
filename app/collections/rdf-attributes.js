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

    initialize: function() {
      app.rdfAttributes = this;
    },

    setRdfEntity: function(rdfEntity) {
      this.rdfEntity = rdfEntity;
    },

    fetch: function() {
      if (!this.rdfEntity) {
        throw 'RdfAttributesCollection must have its RdfEntityModel set before it can be fetched';
      }
      BaseCollection.prototype.fetch.call(this);
    },

    url: function() {
      return app.localMode ? 'mock/attributes.json' : (app.apiRoot + 'attributes');
    }

  });

  return RdfAttributesCollection;
});