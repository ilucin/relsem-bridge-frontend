define([
  'app',
  'views/abstract/base',
  'views/editor/table-row',
  'views/shared/message-dialog'
], function(
  app,
  BaseView,
  TableRowView,
  MessageDialogView
) {
  'use strict';

  var TableView = BaseView.extend({
    className: 'relational-table',
    template: app.fetchTemplate('editor/table'),
    events: {
      'change .in-table-name': 'onTableNameChange',
      'click .btn-table-save': 'onButtonTableSaveClick'
    },
    rows: [],

    initialize: function(options) {
      options = options || {};
      if (!this.model) {
        throw 'TableView must have it\'s table model set.';
      }
      this.rdfAttributes = options.rdfAttributes;
      this.rdfEntities = options.rdfEntities;
      this.setListeners();
    },

    setListeners: function() {
      this.setTableListeners();
    },

    setTableListeners: function() {
      this.listenTo(this.model, 'change', this.refresh, this);
      this.listenTo(this.model, 'attributes:add', this.onAttributeAdd, this);
      this.listenTo(this.model, 'attributes:reset', this.onAttributesReset, this);
    },

    render: function() {
      this.$el.html(this.template());

      this.refresh(this.model.toJSON());
      this.$('.rdf-attribute-droppable').droppable({
        accept: '.rdf-attribute-list-item',
        activeClass: 'accept-drop',
        drop: _.bind(this.onAttributeDrop, this)
      });

      this.$('.rdf-entity-droppable').droppable({
        accept: '.rdf-entity-list-item',
        activeClass: 'accept-drop',
        drop: _.bind(this.onEntityDrop, this)
      });

      return this;
    },

    refresh: function() {
      this.$('.in-table-name').val(this.model.get('name'));
      if (this.model.has('rdfName')) {
        this.$('.table-entity').html('Rdf entity: ' + this.model.get('rdfName'));
      } else {
        this.$('.table-entity').html('No rdf entity set.');
      }
    },

    onTableNameChange: function(event) {
      this.model.set('name', $(event.target).val());
    },

    onAttributeDrop: function(event, el) {
      var uri = $(el.draggable).attr('data-uri');
      var error;

      if (!this.model.has('rdfUri')) {
        error = 'You must first set the rdf entity for this table.';
      } else if (uri) {
        var rdfAttribute = this.rdfAttributes.findWhere({
          uri: uri
        });
        if (rdfAttribute) {
          if (this.model.get('rdfUri') !== this.rdfAttributes.getRdfEntityUri()) {
            (new MessageDialogView()).showConfirmationDialog('Are you sure you want to put attributes of different entities in the same table. Query results for those attributes will always be null.', function() {
              this.model.addAttribute(rdfAttribute);
            }, null, this, 'Yes', 'No');
          } else if (!this.model.hasAttribute(rdfAttribute)) {
            this.model.addAttribute(rdfAttribute);
          } else {
            error = 'Table already has this rdf attribute';
          }
        } else {
          error = 'Rdf attribute with specified uri couldn\'t be found.';
        }
      } else {
        error = 'Dropped attribute doesn\'t have data-uri attribute';
      }

      if (error) {
        console.error(error);
        (new MessageDialogView()).showMessage('Error', error);
      }
    },

    onEntityDrop: function(event, el) {
      var uri = $(el.draggable).attr('data-uri');
      var error;
      if (uri) {
        var rdfEntity = this.rdfEntities.findWhere({
          uri: uri
        });
        if (rdfEntity) {
          if (this.model.has('rdfUri') && this.model.get('rdfUri') !== rdfEntity.get('uri')) {
            (new MessageDialogView()).showConfirmationDialog('You have already set rdf entity for this table. Are you sure you want to remove all existing attributes and set a new entity', function() {
              this.model.setRdfEntity(rdfEntity);
            }, null, this, 'Yes', 'No');
          } else {
            this.model.setRdfEntity(rdfEntity);
          }
        } else {
          error = 'Rdf entity with specified uri couldn\t be found.';
        }
      } else {
        error = 'Dropped entity doesn\'t have data-uri attribute specified.';
      }
      if (error) {
        console.error(error);
        (new MessageDialogView()).showMessage('Error', error);
      }
    },

    onAttributeAdd: function(model) {
      this.addRowView(model);
    },

    onAttributeRemove: function(model) {
      var i;
      for (i = 0; i < this.rows.length; i++) {
        if (this.rows[i].model === model) {
          break;
        }
      }
      this.rows[i].remove();
      this.rows.splice(i, 1);
    },

    addRowView: function(model) {
      var rowView = new TableRowView({
        model: model
      });
      this.rows.push(rowView);
      this.$('.row-new-attribute').before(rowView.render().$el);
    },

    onButtonTableSaveClick: function() {
      if (this.model.isValid()) {
        this.model.save();
      }
    },

    onAttributesReset: function(collection) {
      for (var i = 0; i < this.rows.length; i++) {
        this.rows[i].remove();
      }
      this.rows = [];

      if (collection.length > 0) {
        collection.each(function(model) {
          this.addRowView(model);
        }, this);
      }
    },

    setModel: function(table) {
      this.clearListeners(this.model);
      this.model = table;
      this.setTableListeners();
      this.refresh();
    }

  });

  return TableView;
});