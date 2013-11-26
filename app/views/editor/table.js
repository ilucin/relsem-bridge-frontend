define([
  'app',
  'views/abstract/base',
  'views/editor/table-row'
], function(
  app,
  BaseView,
  TableRowView
) {
  'use strict';

  var TableView = BaseView.extend({
    className: 'table',
    template: app.fetchTemplate('editor/table'),
    events: {
      'click .btn-add-attribute': 'onBtnAddAttributeClick'
    },
    rows: [],

    initialize: function(options) {
      if (!this.model) {
        throw 'TableView must have it\'s table model set.';
      }
      this.table = this.model;
    },

    setListeners: function() {
      this.setTableListeners();
    },

    setTableListeners: function() {
      this.listenTo(this.table, 'change', this.refresh, this);
      this.listenTo(this.table, 'attributes:add', this.addEmptyRow, this);
    },

    render: function() {
      this.$el.html(this.template());
      this.refresh(this.model.toJSON());
      return this;
    },

    refresh: function() {
      this.$('.in-table-name').val(this.table.get('name'));
    },

    onBtnAddAttributeClick: function() {
      this.addEmptyRow();
    },

    addEmptyRow: function() {
      var attr = this.model.addEmptyAttribute();
      var rowView = new TableRowView({
        model: attr
      });
      this.$('.row-new-attribute').before(rowView.render().$el);
    },

    setModel: function(table) {
      this.clearListeners(this.table);
      this.table = table;
      this.setTableListeners();
      this.refresh();
    }

  });

  return TableView;
});