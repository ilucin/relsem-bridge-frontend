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
    parents: [],
    limit: app.entitiesLimit,
    offset: app.entitiesOffset,
    loadRootAttributes: app.entitiesLoadRootAttributes,

    initialize: function() {
      window.entities = this;
      this.limit = app.entitiesLimit;
      this.offset = app.entitiesOffset;
      this.loadRootAttributes = app.entitiesLoadRootAttributes;
    },

    shouldLoadAttributes: function() {
      return this.parents.length > 1 || this.loadRootAttributes === true;
    },

    setEndpoint: function(endpoint) {
      this.endpoint = endpoint;
      this.parents = [];
      this.rootParentEntity = new RdfEntityModel({
        label: 'Root',
        uri: endpoint
      });
      this.setParentEntity(this.rootParentEntity);
    },

    setLimit: function(limit) {
      this.limit = limit;
      window.localStorage.setItem('entitiesLimit', limit);
      this.fetch({
        reset: true
      });
    },

    setOffset: function(offset) {
      this.offset = offset;
      window.localStorage.setItem('entitiesOffset', offset);
      this.fetch({
        reset: true
      });
    },

    setLoadRootAttributes: function(loadRootAttributes) {
      this.loadRootAttributes = loadRootAttributes;
      window.localStorage.setItem('entitiesLoadRootAttributes', loadRootAttributes);
    },

    addTestParentEntity: function() {
      var en = new RdfEntityModel({
        label: (Math.random().toString()),
        uri: 'aisdj'
      });
      this.setParentEntity(en);
      return en;
    },

    setParentEntityUri: function(uri) {
      if (uri === this.endpoint) {
        this.setParentEntity(this.rootParentEntity);
      } else {
        for (var i = 0; i < this.parents.length; i++) {
          if (this.parents[i].get('uri') === uri) {
            return this.setParentEntity(this.parents[i]);
          }
        }
      }
    },

    setParentEntity: function(entity) {
      var index = -1;

      for (var i = 0; i < this.parents.length; i++) {
        if (this.parents[i].get('uri') === entity.get('uri')) {
          index = i;
          break;
        }
      }

      if (index <= this.parents.length) {
        if (index >= 0 && index < this.parents.length - 1) {
          this.parents = this.parents.slice(0, index + 1);
        } else if (index < 0) {
          this.parents.push(entity);
        }
        this.trigger('change:parents');
        this.fetch({
          reset: true
        });
      }
    },

    getParentLabels: function() {
      var res = [];
      _.forEach(this.parents, function(par) {
        res.push(par.get('label'));
      });
      return res;
    },

    getParentLabel: function() {
      return this.parents[this.parents.length - 1].get('label');
    },

    getParentEntityUri: function() {
      return this.parents.length > 1 ? this.parents[this.parents.length - 1].get('uri') : '';
    },

    url: function() {
      return app.localMode ? 'mock/entities.json' : (app.apiRoot + 'semantic/entities?limit=' + this.limit + '&offset=' + this.offset + '&parentEntity=' + this.getParentEntityUri());
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