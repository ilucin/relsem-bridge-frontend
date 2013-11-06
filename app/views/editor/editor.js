define([
  'app',

  'collections/tables',
  'models/table',

  'views/abstract/base',
  'views/editor/connection-form',
  'views/editor/rdf-entity-list',
  'views/editor/rdf-attribute-list',
  'views/editor/rdf-panel',
  'views/editor/table-list',
  'views/editor/table'
], function(
  app,

  TablesCollection,
  TableModel,

  BaseView,
  ConnectionFormView,
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
      this.table = new TableModel();
      this.tables = new TablesCollection();

      this.connectionForm = new ConnectionFormView();
      this.rdfEntityListView = new RdfEntityListView();
      this.rdfAttributeListView = new RdfAttributeListView();
      this.rdfPanelView = new RdfPanelView();
      this.tableView = new TableView({
        model: this.table
      });
      this.tableListView = new TableListView();
    },

    render: function() {
      this.$el.html(this.template());

      this.$('.editor-connection-form').html(this.connectionForm.render().$el);
      this.$('.editor-rdf-entity-list-container').html(this.rdfEntityListView.render().$el);
      // this.$('.editor-rdf-attribute-list-container').html(this.rdfAttributeListView.render().$el);
      this.$('.editor-rdf-panel-container').html(this.rdfPanelView.render().$el);
      this.$('.editor-table-list-container').html(this.tableListView.render().$el);
      this.$('.editor-table-container').html(this.tableView.render().$el);

      return this;
    }

  });

  return EditorView;
});