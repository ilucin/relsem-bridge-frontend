define([
  'app',

  'collections/tables',
  'collections/connections',
  'collections/rdf-entities',
  'collections/rdf-attributes',

  'models/connection',
  'models/table',

  'views/abstract/base',
  'views/shared/message-dialog',

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

  ConnectionModel,
  TableModel,

  BaseView,
  MessageDialogView,

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

      this.conn = new ConnectionModel();
      this.table = new TableModel();
      this.tables = new TablesCollection();
      this.connections = new ConnectionsCollection();
      this.rdfEntities = new RdfEntitiesCollection();
      this.rdfAttributes = new RdfAttributesCollection();

      this.connectionForm = new ConnectionFormView({
        connections: this.connections,
        conn: this.conn
      });
      this.rdfEntityListView = new RdfEntityListView({
        collection: this.rdfEntities
      });
      this.rdfAttributeListView = new RdfAttributeListView({
        collection: this.rdfAttributes
      });

      this.tableView = new TableView({
        model: this.table,
        rdfAttributes: this.rdfAttributes,
        rdfEntities: this.rdfEntities
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
      this.listenTo(this.conn, 'connect:success', this.onConnect, this);
      this.listenTo(this.conn, 'disconnect', this.onDisconnect, this);
      this.listenTo(this.rdfEntityListView, 'selected-item:change', this.onRdfEntityListSelectedItemChange, this);
      this.listenTo(this.tableListView, 'item:select', this.onTableListItemSelect, this);
      this.listenTo(this.table, 'save:success', this.onTableSaveSuccess, this);
      this.listenTo(this.table, 'save:error', this.onTableError, this);
      this.listenTo(this.table, 'save:validationError', this.onTableValidationError, this);
    },

    onConnect: function() {
      this.$('.editor-rdf').show('blind');
      this.$('.editor-connection').hide('blind');
      this.rdfEntities.setEndpoint(this.conn.get('endpoint'));
      this.rdfAttributes.setEndpoint(this.conn.get('endpoint'));
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
        minHeight: 100,
        maxHeight: 500
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
      this.conn.set({
        endpoint: 'http://dbpedia.org/sparql'
      });
      this.conn.connect();
      return this;
    },

    onRdfEntityListSelectedItemChange: function(rdfEntity) {
      this.rdfAttributes.setRdfEntity(rdfEntity);
      this.rdfAttributes.fetch();
    },

    onTableListItemSelect: function(tableListItem, tableModel) {
      this.table = this.tableModel;
      this.tableView.setModel(tableModel);
    },

    onTableError: function(error) {

    },

    onTableValidationError: function(error) {

    },

    onTableSaveSuccess: function() {
      (new MessageDialogView()).showSuccessMessage('Your relational table has been saved');
    }

  });

  return EditorView;
});