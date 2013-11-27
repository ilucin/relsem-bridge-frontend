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
      this.$el.html(this.template({
        label: this.model.getKilledCamelLabel()
      }));
      this.$el.attr('data-uri', this.model.get('uri'));
      this.$el.draggable({
        snap: false,
        appendTo: 'body',
        containment: 'window',
        helper: 'clone',
        scroll: false,
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