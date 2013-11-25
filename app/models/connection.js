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
      'connected': false
    },

    connect: function() {
      if (this.get('connected')) {
        return;
      }
      this.trigger('connect:start');

      setTimeout(_.bind(function() {
        this.set('connected', true);
        this.trigger('connect:success');
      }, this), 1500);
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