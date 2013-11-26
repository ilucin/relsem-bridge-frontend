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
    $emptyListEl: $('<div>').addClass('empty-list-el').html('There are no rdf attributes here.'),

    setupListView: function(options) {
      ListView.prototype.setupListView.call(this, options);
    }

  });

  return RdfAttributeListView;
});