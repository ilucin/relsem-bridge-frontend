define([
  'models/base',
  'app'
], function(
  BaseModel,
  app
) {
  'use strict';

  var ConnectionModel = BaseModel.extend({
    definition: {
      'endpoint': 'string'
    },

    defaults: {
      'connected': false
    },

    connect: function() {
      if (this.get('connected')) {
        return;
      }
      this.trigger('connect:start');

      if (this.get('endpoint').length === 0) {
        this.trigger('connect:error');
        return;
      }

      setTimeout(_.bind(function() {
        this.set('connected', true);
        this.trigger('connect:success');
      }, this), 200);
    },

    disconnect: function() {
      if (this.get('connected')) {
        this.set('connected', false);
        this.trigger('disconnect');
      }
    }

  });

  return ConnectionModel;
});