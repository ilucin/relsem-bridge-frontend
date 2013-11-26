define([
  'app',

  'collections/tables',
  'collections/connections',
  'collections/rdf-entities',
  'collections/rdf-attributes',

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
  RdfEntitiesCollection,
  RdfAttributesCollection,

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
    className: 'editor container',
    template: app.fetchTemplate('editor/editor'),

    initialize: function(options) {
      options = options || {};

      this.table = new TableModel();
      this.tables = new TablesCollection();
      this.connections = app.connections;
      this.rdfEntities = new RdfEntitiesCollection();
      this.rdfAttributes = new RdfAttributesCollection();

      this.connectionForm = new ConnectionFormView({
        connections: this.connections
      });
      this.rdfEntityListView = new RdfEntityListView({
        collection: this.rdfEntities
      });
      this.rdfAttributeListView = new RdfAttributeListView({
        collection: this.rdfAttributes
      });

      this.tableView = new TableView({
        model: this.table
      });
      this.tableListView = new TableListView({
        collection: this.tables
      });

      this.tables.fetch({
        reset: true
      });
    },

    setListeners: function() {
      BaseView.prototype.setListeners.call(this);
      this.listenTo(app.conn, 'connect:success', this.onConnect, this);
      this.listenTo(app.conn, 'disconnect', this.onDisconnect, this);
      this.listenTo(this.rdfEntityListView, 'selected-item:change', this.onRdfEntityListSelectedItemChange, this);
      this.listenTo(this.tableListView, 'item:select', this.onTableListItemSelect, this);
    },

    onConnect: function() {
      this.$('.editor-rdf').show('blind');
      this.$('.editor-connection').hide('blind');
      this.rdfEntities.fetch();
    },

    onDisconnect: function() {
      this.$('.editor-rdf').hide('blind');
      this.$('.editor-connection').show('blind');
      this.rdfEntities.reset();
      this.rdfAttributes.reset();
    },

    render: function() {
      this.$el.html(this.template());

      this.$('.editor-connection-form').html(this.connectionForm.render().$el);
      this.$('.editor-rdf-entity-list-container').html(this.rdfEntityListView.render().$el);
      this.$('.editor-rdf-attribute-list-container').html(this.rdfAttributeListView.render().$el);
      this.$('.editor-table-list-container').html(this.tableListView.render().$el);
      this.$('.editor-table-container').html(this.tableView.render().$el);

      this.$('.editor-rdf').resizable({
        handles: 's',
        minHeight: 150,
        maxHeight: 400
      });

      this.$('.editor-connection-title').on('click', _.bind(function() {
        this.$('.editor-connection').toggle('blind');
      }, this));
      this.$('.editor-rdf-title').on('click', _.bind(function() {
        this.$('.editor-rdf').toggle('blind');
      }, this));
      this.$('.editor-relational-title').on('click', _.bind(function() {
        this.$('.editor-relational').toggle('blind');
      }, this));

      this.setListeners();
      app.conn.connect();
      return this;
    },

    onRdfEntityListSelectedItemChange: function(rdfEntity) {
      this.rdfAttributes.setRdfEntity(rdfEntity);
      this.rdfAttributes.fetch();
    },

    onTableListItemSelect: function(tableListItem, tableModel) {
      this.table = this.tableModel;
      this.tableView.setModel(tableModel);
    }

  });

  return EditorView;
});