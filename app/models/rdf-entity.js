define([
  'Backbone'
], function(
  Backbone
) {
  'use strict';

  var RdfEntityModel = Backbone.Model.extend({

    defaults: {
      'name': '',
      'url': '',
      'type': 'string'
    }

  });

  return RdfEntityModel;
});