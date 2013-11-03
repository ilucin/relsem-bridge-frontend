define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var NavbarView = BaseView.extend({
    el: '#navbar'
  });

  return NavbarView;
});