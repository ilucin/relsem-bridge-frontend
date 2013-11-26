define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var TableRowView = BaseView.extend({
    tagName: 'tr',
    className: 'table-row',
    template: app.fetchTemplate('editor/table-row'),

    initialize: function(options) {
      if (!this.model) {
        throw 'TableRowView must have its attribute set.';
      }
    },

    render: function() {
      this.$el.html(this.template({
        attribute: this.model.toJSON()
      }));
      return this;
    }

  });

  return TableRowView;
});