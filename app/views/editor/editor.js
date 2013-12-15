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
    events: {
      'click .entity-breadcrumb': 'onEntityBreadcrumbClick'
    },

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
      window.tables = this.tables;
    },

    setListeners: function() {
      BaseView.prototype.setListeners.call(this);
      this.listenTo(this.conn, 'connect:success', this.onConnect, this);
      this.listenTo(this.conn, 'disconnect', this.onDisconnect, this);
      this.listenTo(this.rdfEntityListView, 'selected-item:change', this.onRdfEntityListSelectedItemChange, this);
      this.listenTo(this.tableListView, 'item:select', this.onTableListItemSelect, this);
      this.listenTo(this.table, 'save:success', this.onTableSaveSuccess, this);
      this.listenTo(this.table, 'save:error', this.defaultActionErrorHandler, this);
      this.listenTo(this.table, 'save:validationError', this.onTableValidationError, this);
      this.listenTo(this.table, 'delete:success', this.onTableDeleteSuccess, this);
      this.listenTo(this.table, 'delete:error', this.defaultActionErrorHandler, this);
      this.listenTo(this.rdfEntities, 'change:parents', this.onRdfEntitiesParentsChange, this);
    },

    onConnect: function() {
      this.$('.editor-rdf').slideDown().addClass('collapsed');
      this.$('.editor-rdf-title .collapse-arrow').addClass('collapsed');

      this.$('.editor-connection').slideUp().removeClass('collapsed');
      this.$('.editor-connection-title .collapse-arrow').removeClass('collapsed');

      this.rdfEntities.setEndpoint(this.conn.get('endpoint'));
      this.rdfAttributes.setEndpoint(this.conn.get('endpoint'));
      this.rdfEntities.fetch();
    },

    onDisconnect: function() {
      this.$('.editor-rdf').slideUp().removeClass('collapsed');
      this.$('.editor-rdf-title .collapse-arrow').removeClass('collapsed');

      this.$('.editor-connection').slideDown().addClass('collapsed');
      this.$('.editor-connection-title .collapse-arrow').addClass('collapsed');

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
        if (this.$('.editor-connection').hasClass('collapsed')) {
          this.$('.editor-connection').slideUp().removeClass('collapsed');
        } else {
          this.$('.editor-connection').slideDown().addClass('collapsed');
        }
        this.$('.editor-connection-title .collapse-arrow').toggleClass('collapsed');
      }, this));

      this.$('.editor-rdf-title').on('click', _.bind(function() {
        if (this.conn.get('connected')) {
          if (this.$('.editor-rdf').hasClass('collapsed')) {
            this.$('.editor-rdf').slideUp().removeClass('collapsed');
          } else {
            this.$('.editor-rdf').slideDown().addClass('collapsed');
          }
          this.$('.editor-rdf-title .collapse-arrow').toggleClass('collapsed');
        }
      }, this));

      this.$('.editor-relational-title').on('click', _.bind(function() {
        if (this.$('.editor-relational').hasClass('collapsed')) {
          this.$('.editor-relational').slideUp().removeClass('collapsed');
        } else {
          this.$('.editor-relational').slideDown().addClass('collapsed');
        }
        this.$('.editor-relational-title .collapse-arrow').toggleClass('collapsed');
      }, this));

      this.setListeners();
      return this;
    },

    onRdfEntitiesParentsChange: function() {
      var parents = this.rdfEntities.getParentLabels();
      var $breadcrumbs = this.$('.entity-breadcrumbs').html('Entities: ');
      for (var i = 0; i < this.rdfEntities.parents.length; i++) {
        if (i > 0) {
          $breadcrumbs.append('<img class="breadcrumb-divider" src="assets/images/arrow_right.png"></img>');
        }
        var en = this.rdfEntities.parents[i];
        var $en = $('<li>').addClass('entity-breadcrumb').attr('data-uri', en.get('uri')).html(en.get('label'));
        $breadcrumbs.append($en);
      }
    },

    onRdfEntityListSelectedItemChange: function(rdfEntity) {
      this.rdfAttributes.setRdfEntity(rdfEntity);
      this.rdfEntities.setParentEntity(rdfEntity);
      this.rdfAttributes.fetch();
    },

    onTableListItemSelect: function(tableListItem, tableModel) {
      this.table = tableModel;
      this.tableView.setModel(tableModel);
      tableModel.set('locked', true);
      this.table.loadTableDefinition();
    },

    onTableDeleteSuccess: function(model) {
      this.tables.remove(model);
    },

    onTableValidationError: function(error) {
      (new MessageDialogView()).showMessage('Validation error');
    },

    onTableSaveSuccess: function(model) {
      (new MessageDialogView()).showSuccessMessage('Your relational table has been saved');
      this.tables.add(model);
    },

    onEntityBreadcrumbClick: function(e) {
      var uri = $(e.target).attr('data-uri');
      this.rdfEntities.setParentEntityUri(uri);
    }

  });

  return EditorView;
});