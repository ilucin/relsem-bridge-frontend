define([
  'backbone'
], function(
  Backbone
) {
  'use strict';

  var RdfAttributeModel = Backbone.Model.extend({

    defaults: {
      'name': '',
      'type': 'string'
    }

  });

  return RdfAttributeModel;
});