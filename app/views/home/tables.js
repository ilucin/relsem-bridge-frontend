define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var TablesView = BaseView.extend({
    className: 'tables-view container',
    template: app.fetchTemplate('home/tables'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return TablesView;
});