define([
  'app',
  'views/abstract/list',
  'views/editor/table-list-item'
], function(
  app,
  ListView,
  TableListItemView
) {
  'use strict';

  var TableListView = ListView.extend({
    className: 'list table-list',
    $emptyListEl: $('<div>').addClass('empty-list-el').html('You don\'t have any relational tables.'),

    setupListView: function(options) {
      ListView.prototype.setupListView.call(this, options);
      this.itemView = TableListItemView;
      this.on('item:active', this.onItemActive, this);
    },

    onItemActive: function(listItem) {
      if (this.lastSelectedItem) {
        this.lastSelectedItem.toggleSelected();
      }
      this.lastSelectedItem = listItem;
      listItem.toggleSelected();
    }

  });

  return TableListView;
});