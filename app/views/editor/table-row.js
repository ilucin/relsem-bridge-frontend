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
      'change .input': 'onInputChange'
    },

    initialize: function(options) {
      if (!this.model) {
        throw 'TableRowView must have its attribute set.';
      }
    },

    render: function() {
      this.$el.html(this.template({
        attribute: this.model.toJSON()
      }));
      var $inType = this.$('.in-type');
      for (var i = 0; i < this.model.Types.length; i++) {
        $inType.append($('<option>').attr('value', this.model.Types[i]).html(this.model.Types[i]));
      }
      $inType.val(this.model.get('type'));

      return this;
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