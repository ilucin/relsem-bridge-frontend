define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var RdfEntityModel = BaseModel.extend({

    definition: {
      'label': 'string',
      'uri': 'string'
    }

  });

  return RdfEntityModel;
});