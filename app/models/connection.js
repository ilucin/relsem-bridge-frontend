define([
  'models/base',
  'app'
], function(
  BaseModel,
  app
) {
  'use strict';

  var ConnectionModel = BaseModel.extend({

    defaults: {
      'name': '',
      'endpoint': '',
      'isConnected': false
    },

    connect: function(name, endpoint) {
      this.set({
        name: name,
        endpoint: endpoint,
        isConnected: true
      });
      this.trigger('connect');
    },

    disconnect: function() {
      this.set(this.defaults);
      this.trigger('disconnect');
    }

  });

  return ConnectionModel;
});