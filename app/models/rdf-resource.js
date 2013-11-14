define([
  'models/base'
], function(
  BaseModel
) {
  'use strict';

  var RefResourceModel = BaseModel.extend({

    defaults: {
      'name': '',
      'url': ''
    }

  });

  return RefResourceModel;
});