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
      'rdfUri': 'string',
      'rdfName': 'string'
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
      if (this.has('rdfUri') && this.get('rdfUri') !== rdfEntity.get('uri')) {
        this.get('attributes').reset();
      }
      this.set('rdfUri', rdfEntity.get('uri'));
      this.set('rdfName', rdfEntity.get('label'));
      if (!this.has('name')) {
        this.set('name', rdfEntity.get('label'));
      }
    },

    save: function() {
      if (!this.isValid()) {
        this.trigger('save:validationError', this.validationError);
        return this.validationError;
      }

      var url = app.apiRoot + 'schema/' + this.get('name');

      $.ajax(url, {
        method: 'POST',
        context: this,
        data: {
          table: this.get('name'),
          entity: this.get('rdfUri'),
          attributes: this.getAttributesJson()
        },
        success: function(response) {
          if (response.status === 'OK') {
            this.trigger('save:success', this);
          } else {
            this.trigger('save:error', this);
          }
        }
      });

    }

  });

  return TableModel;
});