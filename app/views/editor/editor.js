define([
  'app',

  'collections/tables',
  'collections/connections',

  'models/table',

  'views/abstract/base',
  'views/editor/connection-form',
  'views/editor/rdf-entity-list',
  'views/editor/rdf-attribute-list',
  'views/editor/table-list',
  'views/editor/table'
], function(
  app,

  TablesCollection,
  ConnectionsCollection,

  TableModel,

  BaseView,
  ConnectionFormView,
  RdfEntityListView,
  RdfAttributeListView,
  TableListView,
  TableView
) {
  'use strict';

  var EditorView = BaseView.extend({
    className: 'editor-view container',
    template: app.fetchTemplate('editor/editor'),

    initialize: function(options) {
      options = options || {};

      this.table = new TableModel();
      this.tables = new TablesCollection();

      this.connectionForm = new ConnectionFormView({
        connections: options.connections
      });
      this.rdfEntityListView = new RdfEntityListView({
        rdfEntities: options.rdfEntities
      });
      this.rdfAttributeListView = new RdfAttributeListView({
        rdfAttributes: options.rdfAttributes
      });

      this.tableView = new TableView({
        model: this.table
      });
      this.tableListView = new TableListView({
        collection: this.tables,
      });

      this.tables.fetch({
        reset: true
      });
    },

    setListeners: function() {
      BaseView.prototype.setListeners.call(this);
      this.listenTo(this.tableListView, 'item:select', this.onTableListItemSelect, this);
    },

    render: function() {
      this.$el.html(this.template());

      this.$('.editor-connection-form').html(this.connectionForm.render().$el);
      this.$('.editor-rdf-entity-list-container').html(this.rdfEntityListView.render().$el);
      this.$('.editor-rdf-attribute-list-container').html(this.rdfAttributeListView.render().$el);
      this.$('.editor-table-list-container').html(this.tableListView.render().$el);
      this.$('.editor-table-container').html(this.tableView.render().$el);

      this.setListeners();
      return this;
    },

    onTableListItemSelect: function(tableListItem, tableModel) {
      this.table = this.tableModel;
      this.tableView.setModel(tableModel);
    }

  });

  return EditorView;
});