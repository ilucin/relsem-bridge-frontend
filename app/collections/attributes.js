define([
  'backbone',
  'models/attribute'
], function(
  Backbone,
  AttributeModel
) {
  'use strict';

  var AttributesCollection = Backbone.Collection.extend({
    model: AttributeModel
  });

  return AttributesCollection;
});