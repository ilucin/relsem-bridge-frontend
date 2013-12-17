define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var RdfEntityListItemView = BaseView.extend({
    className: 'list-item rdf-entity-list-item',
    template: app.fetchTemplate('editor/rdf-entity-list-item'),
    events: {
      'click': 'onClick',
      'click .rdf-entity-arrow': 'onArrowClick'
    },
    selected: false,

    render: function() {
      this.$el.html(this.template({
        label: this.model.getUnnumberedLabel(),
        uri: this.model.get('uri')
      }));
      this.$el.attr('data-uri', this.model.get('uri'));
      this.initDraggable();
      return this;
    },

    initDraggable: function() {
      this.$el.draggable({
        snap: false,
        appendTo: 'body',
        containment: 'window',
        helper: 'clone',
        scroll: false,
        disable: true,
        handle: '.rdf-entity-handle',
        opacity: 0.9,
        revert: true,
        revertDuration: 10,
        zIndex: 100
      });
    },

    toggleSelected: function() {
      this.selected = !this.selected;
      this.$el.toggleClass('selected');
      this.initDraggable();
      if (this.selected) {
        this.trigger('select', this.model);
        this.$el.draggable('enable');
      } else {
        this.trigger('unselect', this.model);
        this.$el.draggable('disable');
      }
    },

    onClick: function() {
      this.trigger('active');
    },

    onArrowClick: function() {
      this.trigger('branch', this.model);
    },

    getModel: function() {
      return this.model;
    }

  });

  return RdfEntityListItemView;
});