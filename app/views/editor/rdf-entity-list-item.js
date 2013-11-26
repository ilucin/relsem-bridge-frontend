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
      'click': 'onClick'
    },
    selected: false,

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.attr('data-uri', this.model.get('uri'));
      this.$el.draggable({
        snap: false,
        appendTo: 'body',
        containment: 'window',
        scroll: false,
        helper: 'clone',
        disable: true,
        handle: '.rdf-entity-handle',
        opacity: 0.9,
        revert: true,
        revertDuration: 10,
        zIndex: 100
      });
      return this;
    },

    toggleSelected: function() {
      this.selected = !this.selected;
      this.$el.toggleClass('selected');
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

    getModel: function() {
      return this.model;
    }

  });

  return RdfEntityListItemView;
});