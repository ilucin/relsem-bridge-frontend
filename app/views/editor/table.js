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

    initialize: function(options) {
      if (!this.model) {
        throw 'TableView must have it\'s table model set.';
      }
    },

    setListeners: function() {
      this.listenTo(this.model, 'change', this.refresh, this);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    refresh: function() {

    }

  });

  return TableView;
});