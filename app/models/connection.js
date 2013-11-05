define([
  'backbone',
  'app'
], function(
  Backbone,
  app
) {
  'use strict';

  var ConnectionModel = Backbone.Model.extend({

    defaults: {
      'name': '',
      'endpoint': '',
      'isConnected': false
    },

    connect: function(name, endpoint) {
      console.log('Connecting to: ' + name + ', ' + endpoint);
      this.set({
        name: name,
        endpoint: endpoint,
        isConnected: true
      });
      this.trigger('change');
    },

    disconnect: function() {
      this.set(this.defaults);
    }

  });

  return ConnectionModel;
});