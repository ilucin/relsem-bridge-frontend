define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var RdfAttributeListItemView = BaseView.extend({
    className: 'list-item rdf-attribute-list-item',
    template: app.fetchTemplate('editor/rdf-attribute-list-item'),
    events: {
      'click': 'onClick'
    },
    selected: false,

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
      this.$el.draggable({
        snap: true,
        containment: 'document',
        scroll: false,
        opacity: 0.8,
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
      } else {
        this.trigger('unselect', this.model);
      }
    },

    onClick: function() {
      this.trigger('active');
    }

  });

  return RdfAttributeListItemView;
});