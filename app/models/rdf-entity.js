define([
  'app',
  'models/base'
], function(
  app,
  BaseModel
) {
  'use strict';

  var RdfEntityModel = BaseModel.extend({

    definition: {
      'label': 'string',
      'uri': 'string'
    },

    getUnnumberedLabel: function() {
      return app.helpers.removeNumbersFromEnd(this.get('label'));
    },

    getKilledCamelLabel: function() {
      return app.helpers.killTheCamel(this.get('label'));
    }

  });

  return RdfEntityModel;
});