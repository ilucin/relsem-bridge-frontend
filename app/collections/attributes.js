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
    },

    addId: function() {
      var attribute = new AttributeModel({
        name: 'ID',
        notnull: true,
        length: 255
      });
      attribute.removable = false;
      this.add(attribute);
      return attribute;
    },

    addAttribute: function(rdfAttribute) {
      var attribute = new AttributeModel({
        id: rdfAttribute.get('uri'),
        uri: rdfAttribute.get('uri'),
        name: rdfAttribute.get('label')
      });
      this.add(attribute);
      return attribute;
    }

  });

  return AttributesCollection;
});