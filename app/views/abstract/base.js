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
    }

  });

  return BaseView;
});