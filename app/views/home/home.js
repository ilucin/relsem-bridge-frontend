define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var HomeView = BaseView.extend({
    className: 'home container',
    template: app.fetchTemplate('home/home'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return HomeView;
});