define([
  'app',
  'views/abstract/base',
  'views/editor/rdf-entity-list',
  'views/editor/rdf-attribute-list',
  'views/editor/rdf-panel',
  'views/editor/table-list',
  'views/editor/table'
], function(
  app,
  BaseView,
  RdfEntityListView,
  RdfAttributeListView,
  RdfPanelView,
  TableListView,
  TableView
) {
  'use strict';

  var EditorView = BaseView.extend({
    className: 'editor-view container',
    template: app.fetchTemplate('editor/editor'),

    initialize: function() {
      this.rdfEntityListView = new RdfEntityListView();
      this.rdfAttributeListView = new RdfAttributeListView();
      this.rdfPanelView = new RdfPanelView();
      this.tableView = new TableView();
      this.tableListView = new TableListView();
    },

    render: function() {
      this.$el.html(this.template());

      this.$('.editor-rdf-entity-list-container').html(this.rdfEntityListView.render().$el);
      this.$('.editor-rdf-attribute-list-container').html(this.rdfAttributeListView.render().$el);
      this.$('.editor-rdf-panel-container').html(this.rdfPanelView.render().$el);
      this.$('.editor-table-list-container').html(this.tableListView.render().$el);
      this.$('.editor-table-container').html(this.tableView.render().$el);

      return this;
    }

  });

  return EditorView;
});