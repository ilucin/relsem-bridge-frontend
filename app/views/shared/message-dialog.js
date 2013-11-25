define([
  'app',

  'views/shared/dialog'
], function(
  app,

  DialogView
) {
  'use strict';

  var MessageDialogView = DialogView.extend({

    initialize: function() {
      this.className += ' message-dialog';
    },

    showMessage: function(title, message, callback, context, rightCallback, leftText, rightText) {
      var dialogConfig = {
        title: title,
        message: message,
        left: {
          text: leftText || 'OK',
          callback: callback ? _.bind(callback, context || this) : callback,
        }
      };

      if (rightText) {
        dialogConfig.right = {
          text: rightText
        };

        if (rightCallback) {
          dialogConfig.right.callback = _.bind(rightCallback, context || this);
        }
      }

      this.show(dialogConfig);
    },

    showConfirmationDialog: function(message, leftCallback, rightCallback, context, leftText, rightText) {
      this.showMessage('', message, leftCallback, context, rightCallback, leftText || 'Yes', rightText || 'No');
    },

    showErrorMessage: function(title, message, callback, context) {
      message = message || 'An error occured';
      this.showMessage(title, message, callback, context);
    },

    showSuccessMessage: function(message, callback, context) {
      this.showMessage(null, message || 'Action completed successfully', callback, context);
    },

    showNotImplementedMessage: function() {
      this.showMessage(null, 'This action is not yet implemented');
    }

  });

  return MessageDialogView;
});