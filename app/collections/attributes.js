define([
  'backbone',
  'models/attribute'
], function(
  Backbone,
  AttributeModel
) {
  'use strict';

  var AttributesCollection = Backbone.Collection.extend({
    model: AttributeModel,
    addDummyAttribute: function() {
      var attribute = new AttributeModel();
      this.add(attribute);
      return attribute;
    }
  });

  return AttributesCollection;
});