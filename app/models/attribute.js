define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var AttributeModel = BaseModel.extend({

    defaults: {
      'name': '',
      'type': 'string',
      'length': 100,
      'nullable': false,
      'default': ''
    }

  });

  return AttributeModel;
});