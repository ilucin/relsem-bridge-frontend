define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var TableListItemView = BaseView.extend({
    className: 'list-item table-list-item',
    template: app.fetchTemplate('editor/table-list-item'),
    events: {
      'click': 'onClick'
    },
    selected: false,

    render: function() {
      this.$el.html(this.template(this.model.toJSON()));
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

  return TableListItemView;
});