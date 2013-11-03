define([
  'Backbone'
], function(
  Backbone
) {
  'use strict';

  var AttributeModel = Backbone.Model.extend({

    defaults: {
      'name': '',
      'type': 'string',
      'length': 100,
      'notNull': true,
      'default': ''
    }

  });

  return AttributeModel;
});