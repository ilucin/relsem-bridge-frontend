define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var TableView = BaseView.extend({
    className: 'table-view',
    template: app.fetchTemplate('editor/table'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return TableView;
});