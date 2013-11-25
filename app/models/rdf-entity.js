define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var RdfEntityModel = BaseModel.extend({

    defaults: {
      'name': '',
      'url': ''
    }

  });

  return RdfEntityModel;
});