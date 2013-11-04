define([
  'backbone',
  'collections/attributes'
], function(
  Backbone,
  AttributesCollection
) {
  'use strict';

  var TableModel = Backbone.Model.extend({

    defaults: {
      'name': ''
    },

    initialize: function(attributes, options) {
      options = options || {};
      this.set('attributes', new AttributesCollection());
    }

  });

  return TableModel;
});