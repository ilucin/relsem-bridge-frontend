define([
  'models/base',
  'collections/attributes'
], function(
  BaseModel,
  AttributesCollection
) {
  'use strict';

  var TableModel = BaseModel.extend({

    defaults: {
      'name': ''
    },

    initialize: function(attributes, options) {
      options = options || {};
      this.set('attributes', new AttributesCollection());
      this.get('attributes').on('add', this.onAttributesAdd, this);
      this.get('attributes').on('remove', this.onAttributesRemove, this);
      this.get('attributes').on('change', this.onAttributesChange, this);
      this.get('attributes').on('reset', this.onAttributesReset, this);
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