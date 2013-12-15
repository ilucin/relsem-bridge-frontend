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

    initialize: function() {
      window.entities = this;
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

    addTestParentEntity: function() {
      var en = new RdfEntityModel({
        label: (Math.random().toString()),
        uri: 'aisdj'
      });
      this.setParentEntity(en);
      return en;
    },

    setParentEntityUri: function(uri) {
      var entity = this.findWhere({
        uri: uri
      });
      if (entity) {
        this.setParentEntity(entity);
      } else {
        if (uri === this.endpoint) {
          this.setParentEntity(this.rootParentEntity);
        }
      }
    },

    setParentEntity: function(entity) {
      var index = this.parents.indexOf(entity);
      if (index >= 0 && index < this.parents.length - 1) {
        this.parents = this.parents.slice(0, index + 1);
      } else if (index < 0) {
        this.parents.push(entity);
      }
      this.trigger('change:parents');
      // console.log(this.parents);
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