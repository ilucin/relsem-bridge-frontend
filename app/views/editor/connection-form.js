define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var ConnectionFormView = BaseView.extend({
    className: 'connection-form-view',
    template: app.fetchTemplate('editor/connection-form'),
    events: {
      'click .btn-connect': 'onBntConnectClick'
    },

    initialize: function() {
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(app.conn, 'change', this.onConnectionChange, this);
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onBntConnectClick: function() {
      if (app.conn.get('isConnected')) {
        app.conn.disconnect();
      } else {
        var name = this.$('.in-connection-name').val();
        var endpoint = this.$('.in-connection-endpoint').val();
        app.conn.connect(name, endpoint);
      }
    },

    onConnectionChange: function() {
      if (app.conn.get('isConnected')) {
        this.$('.btn-connect').html('Disconnect');
      } else {
        this.$('.btn-connect').html('Connect');
      }
    }

  });

  return ConnectionFormView;
});