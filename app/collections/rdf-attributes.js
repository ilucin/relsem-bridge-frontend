define([
  'collections/base',
  'models/rdf-attribute'
], function(
  BaseCollection,
  RdfAttributeModel
) {
  'use strict';

  var RdfAttributesCollection = BaseCollection.extend({
    model: RdfAttributeModel
  });

  return RdfAttributesCollection;
});