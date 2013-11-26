define([
  'app',
  'views/abstract/list',
  'views/editor/rdf-entity-list-item'
], function(
  app,
  ListView,
  RdfEntityListItemView
) {
  'use strict';

  var RdfEntityListView = ListView.extend({
    className: 'list rdf-entity-list',
    itemView: RdfEntityListItemView,

    setupListView: function(options) {
      ListView.prototype.setupListView.call(this, options);
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this, 'item:active', this.onItemActive, this);
    },

    onItemActive: function(listItem) {
      if (this.selectedItem === listItem) {
        return;
      }

      if (this.selectedItem) {
        this.selectedItem.toggleSelected();
      }

      this.selectedItem = listItem;
      listItem.toggleSelected();
      this.trigger('selected-item:change', listItem.getModel());
    },

    getSelectedItem: function() {
      return this.selectedItem;
    }

  });

  return RdfEntityListView;
});