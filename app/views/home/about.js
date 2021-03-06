define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var AboutView = BaseView.extend({
    className: 'about-view container',
    template: app.fetchTemplate('home/about'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return AboutView;
});