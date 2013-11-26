define([
  'app',
  'views/abstract/list',
  'views/editor/rdf-attribute-list-item'
], function(
  app,
  ListView,
  RdfAttributeListItemView
) {
  'use strict';

  var RdfAttributeListView = ListView.extend({
    className: 'list rdf-attribute-list',
    itemView: RdfAttributeListItemView,

    setupListView: function(options) {
      ListView.prototype.setupListView.call(this, options);
    }

  });

  return RdfAttributeListView;
});