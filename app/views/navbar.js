define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var NavbarView = BaseView.extend({
    el: '#navbar',

    initialize: function() {
      this.setListeners();
    },

    setListeners: function() {
      // this.listenTo(app.conn, 'change', this.onConnectionChange, this);
      app.conn.on('change', this.onConnectionChange, this);
    },

    onConnectionChange: function() {
      console.log('asd');
      if (app.conn.get('isConnected')) {
        this.$('.btn-disconnect')
          .html('Disconnect from \'' + app.conn.get('name') + '\'')
          .removeClass('hide');
      } else {
        this.$('.btn-disconnect')
          .addClass('hide');
      }
    }

  });

  return NavbarView;
});