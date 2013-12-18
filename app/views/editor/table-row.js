define([
  'app',
  'views/abstract/base',
  'views/shared/message-dialog'
], function(
  app,
  BaseView,
  MessageDialogView
) {
  'use strict';

  var TableRowView = BaseView.extend({
    tagName: 'tr',
    className: 'table-row',
    template: app.fetchTemplate('editor/table-row'),
    events: {
      'change .input': 'onInputChange',
      'click .btn-table-row-delete': 'onBtnTableRowDelete'
    },

    initialize: function(options) {
      if (!this.model) {
        throw 'TableRowView must have its attribute set.';
      }
    },

    render: function() {
      var data = this.model.toJSON();
      data.editable = this.model.editable;

      this.$el.html(this.template({
        attribute: data
      }));
      if (this.model.removable) {
        this.$el.addClass('removable');
      }
      var $inType = this.$('.in-type');
      for (var i = 0; i < this.model.Types.length; i++) {
        $inType.append($('<option>').attr('value', this.model.Types[i]).html(this.model.Types[i]));
      }
      $inType.val(this.model.get('type'));
      this.$('td:last-child').append($('<div>').addClass('btn-table-row-delete').html($('<span>').addClass('glyphicon glyphicon-remove-circle')));

      return this;
    },

    onBtnTableRowDelete: function() {
      this.trigger('delete', this.model);
    },

    onInputChange: function(event) {
      var $input = $(event.target);
      var property = $input.attr('name');
      var value = $input.attr('type') === 'checkbox' ? $input.prop('checked') : $input.val();

      if (property && this.model.has(property)) {
        this.model.set(property, value, {
          validate: true
        });
        if (this.model.validationError) {
          _.forEach(this.model.validationError, function(error) {
            if (error.property === property) {
              $input.val(this.model.get(property));
              (new MessageDialogView()).showMessage('Validation error', error.message);
              return;
            }
          }, this);
        }
      }
    }

  });

  return TableRowView;
});