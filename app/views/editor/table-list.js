define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var TableListView = BaseView.extend({
    className: 'table-list-view',
    template: app.fetchTemplate('editor/table-list'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return TableListView;
});