define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var RdfAttributeModel = BaseModel.extend({

    defaults: {
      'name': '',
      'type': 'string'
    }

  });

  return RdfAttributeModel;
});