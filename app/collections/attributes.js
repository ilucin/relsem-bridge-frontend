define([
  'collections/base',
  'models/attribute'
], function(
  BaseCollection,
  AttributeModel
) {
  'use strict';

  var AttributesCollection = BaseCollection.extend({
    model: AttributeModel,
    addEmptyAttribute: function() {
      var attribute = new AttributeModel();
      this.add(attribute);
      return attribute;
    }
  });

  return AttributesCollection;
});