define([
  'models/base',
  'collections/attributes'
], function(
  BaseModel,
  AttributesCollection
) {
  'use strict';

  var TableModel = BaseModel.extend({

    definition: {
      'id': 'int',
      'name': 'string'
    },

    initialize: function(attributes, options) {
      options = options || {};
      this.set('attributes', new AttributesCollection());
      this.listenTo(this.get('attributes'), 'add', this.onAttributesAdd, this);
      this.listenTo(this.get('attributes'), 'remove', this.onAttributesRemove, this);
      this.listenTo(this.get('attributes'), 'change', this.onAttributesChange, this);
      this.listenTo(this.get('attributes'), 'reset', this.onAttributesReset, this);
    },

    onAttributesAdd: function() {
      this.trigger('attributes:add');
    },

    onAttributesRemove: function() {
      this.trigger('attributes:remove');
    },

    onAttributesChange: function() {
      this.trigger('attributes:change');
    },

    onAttributesReset: function() {
      this.trigger('attributes:reset');
    },

    addAttributes: function(attributes, options) {
      this.get('attributes').add(attributes, options);
    },

    removeAttributes: function(attributes, options) {
      this.get('attributes').remove(attributes, options);
    },

    addEmptyAttribute: function() {
      return this.get('attributes').addEmptyAttribute();
    }

  });

  return TableModel;
});