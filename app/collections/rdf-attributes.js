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
    sorting: app.attributesSort,

    initialize: function(values, options) {
      this.limit = app.attributesLimit;
      this.offset = app.attributesOffset;
      this.sorting = app.attributesSort;
      BaseCollection.prototype.initialize.call(values, options);
    },

    setRdfEntity: function(rdfEntity) {
      this.rdfEntity = rdfEntity;
    },

    setEndpoint: function(endpoint) {
      this.endpoint = endpoint;
    },

    setSort: function(sort) {
      this.sorting = sort;
      window.localStorage.setItem('attributesSort', this.sorting);
      this.fetch({
        reset: true
      });
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
      if (this.rdfEntity && this.endpoint) {
        BaseCollection.prototype.fetch.call(this);
      }
    },

    url: function() {
      return app.localMode ? 'mock/attributes.json' : (app.apiRoot + 'semantic/attributes?limit=' + this.limit + '&offset=' + this.offset + '&entity=' + encodeURIComponent(this.rdfEntity.get('uri')) + '&sort=' + this.sorting);
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