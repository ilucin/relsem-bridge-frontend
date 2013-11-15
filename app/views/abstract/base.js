define([
  'backbone',
  'app'
], function(
  Backbone,
  app
) {
  'use strict';

  var BaseView = Backbone.View.extend({

    render: function() {
      return this;
    },

    setListeners: function() {},

    clearListeners: function() {
      this.stopListening();
    },

    cleanup: function() {
      this.clearListeners();
      this.$el.html('');
    }

  });

  return BaseView;
});