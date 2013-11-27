define([
  'backbone',
  'app',
  'views/shared/message-dialog'
], function(
  Backbone,
  app,
  MessageDialogView
) {
  'use strict';

  var BaseView = Backbone.View.extend({

    render: function() {
      return this;
    },

    setListeners: function() {},

    clearListeners: function() {
      this.stopListening();
      this.off();
    },

    cleanup: function() {
      this.clearListeners();
      this.$el.html('');
    },

    defaultActionErrorHandler: function(error) {
      (new MessageDialogView()).showMessage('An error occured', error);
    },

  });

  return BaseView;
});