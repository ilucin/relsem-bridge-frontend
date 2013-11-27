define([
  'app',
  'models/base',
  'collections/attributes'
], function(
  app,
  BaseModel,
  AttributesCollection
) {
  'use strict';

  var TableModel = BaseModel.extend({

    definition: {
      'name': 'string',
      'attributes': 'array<AttributeModel>',
      'entityUri': 'string',
      'entityLabel': 'string'
    },

    defaults: {
      'locked': false,
    },

    initialize: function(attributes, options) {
      options = options || {};
      this.set('attributes', new AttributesCollection());
      this.listenTo(this.get('attributes'), 'add', this.onAttributesAdd, this);
      this.listenTo(this.get('attributes'), 'remove', this.onAttributesRemove, this);
      this.listenTo(this.get('attributes'), 'change', this.onAttributesChange, this);
      this.listenTo(this.get('attributes'), 'reset', this.onAttributesReset, this);
    },

    onAttributesAdd: function(model, collections, options) {
      this.trigger('attributes:add', model, collections, options);
    },

    onAttributesRemove: function(model, collections, options) {
      this.trigger('attributes:remove', model, collections, options);
    },

    onAttributesChange: function() {
      this.trigger('attributes:change');
    },

    onAttributesReset: function(collections, options) {
      this.trigger('attributes:reset', collections, options);
    },

    addAttributes: function(attributes, options) {
      this.get('attributes').add(attributes, options);
    },

    removeAttributes: function(attributes, options) {
      this.get('attributes').remove(attributes, options);
    },

    addEmptyAttribute: function() {
      return this.get('attributes').addEmptyAttribute();
    },

    addAttribute: function(rdfAttribute) {
      if (!this.hasAttribute(rdfAttribute)) {
        return this.get('attributes').addAttribute(rdfAttribute);
      }
    },

    hasAttribute: function(rdfAttribute) {
      return this.get('attributes').findWhere({
        uri: rdfAttribute.get('uri')
      }) !== undefined;
    },

    getAttributesJson: function() {
      return JSON.stringify(this.get('attributes').toJSON());
    },

    setRdfEntity: function(rdfEntity) {
      if (this.has('entityUri') && this.get('entityUri') !== rdfEntity.get('uri')) {
        this.get('attributes').reset();
      }
      this.set('entityUri', rdfEntity.get('uri'));
      this.set('entityLabel', rdfEntity.get('label'));
      if (!this.has('name')) {
        this.set('name', rdfEntity.get('label'));
      }
    },

    deleteTable: function() {
      var url = app.localMode ? 'mock/table.json' : app.apiRoot + 'schema/' + this.get('name');

      if (app.localMode) {
        this.trigger('delete:complete');
      } else {
        this.trigger('ajax:start');
        $.ajax(url, {
          method: 'DELETE',
          context: this,
          complete: function() {
            this.trigger('ajax:complete');
          },
          success: function(response) {
            if (_.isString(response)) {
              response = JSON.parse(response);
            }
            if (response.status === 'OK') {
              this.trigger('delete:success');
            } else {
              this.trigger('delete:error', 'Table has not been deleted');
            }
          }
        });
      }
    },

    saveTable: function() {
      if (!this.isValid()) {
        this.trigger('save:validationError', this.validationError);
        return this.validationError;
      }

      if (app.localMode) {
        this.trigger('save:succes', this);
      } else {
        this.trigger('ajax:start');
        $.ajax(app.apiRoot + 'schema/' + this.get('name'), {
          method: 'POST',
          context: this,
          data: {
            table: this.get('name'),
            entityUri: this.get('entityUri'),
            entityLabel: this.get('entityLabel'),
            attributes: this.getAttributesJson()
          },
          complete: function() {
            this.trigger('ajax:complete', this);
          },
          success: function(response) {
            if (_.isString(response)) {
              response = JSON.parse(response);
            }

            if (response.status === 'OK') {
              this.trigger('save:success', this);
            } else {
              this.trigger('save:error', this);
            }
          }
        });
      }
    },

    loadTableDefinition: function() {
      var url = app.localMode ? 'mock/table.json' : app.apiRoot + 'schema/' + this.get('name');

      this.trigger('ajax:start');
      $.ajax(url, {
        context: this,
        complete: function() {
          this.trigger('ajax:complete');
        },
        success: function(response) {
          if (_.isString(response)) {
            response = JSON.parse(response);
          }

          if (response.name) {
            this.set({
              name: response.name,
              entityLabel: response.entityLabel,
              entityUri: response.entityUri
            });
            this.get('attributes').reset(response.attributes);
            this.trigger('load:success');
          } else {
            this.trigger('load:error');
          }
        }
      });
    },

    getTableData: function() {
      var url = app.apiRoot + 'schema/data/' + this.get('name');
      $.ajax(url, {
        context: this,
        success: function(response) {
          this.trigger('data:success', response);
        }
      });
    }

  });

  return TableModel;
});