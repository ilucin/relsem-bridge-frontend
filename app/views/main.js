define([
  'app',
  'views/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var MainView = BaseView.extend({
    template: app.fetchTemplate('main'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return MainView;
});