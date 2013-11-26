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

      if (app.localMode) {
        setTimeout(_.bind(function() {
          this.set('connected', true);
          this.trigger('connect:success');
        }, this), 300);
      } else {
        this.set('connected', true);
        this.trigger('connect:success');
      }
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