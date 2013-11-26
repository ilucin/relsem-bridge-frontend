define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var ConnectionFormView = BaseView.extend({
    className: 'connection-form row',
    template: app.fetchTemplate('editor/connection-form'),
    events: {
      'click .btn-connect': 'onBntConnectClick',
      'change .connection-select': 'onConnectionSelectChange'
    },

    initialize: function(options) {
      options = options || {};
      this.connections = options.connections;
      console.assert(this.connections, 'ConnectionFormView must have its connections collection set');
      app.cf = this;
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.connections, 'fetch:start', this.onConnectionsFetchStart, this);
      this.listenTo(this.connections, 'fetch:complete', this.onConnectionsFetchComplete, this);
      this.listenTo(this.connections, 'reset', this.onConnectionsReset, this);
      this.listenTo(this.connections, 'add', this.onConnectionsAdd, this);
      this.listenTo(this.connections, 'remove', this.onConnectionsRemove, this);
      this.listenTo(app.conn, 'change', this.onConnectionChange, this);
      this.listenTo(app.conn, 'connect:start', this.onConnectionStart, this);
      this.listenTo(app.conn, 'connect:success', this.onConnectionSuccess, this);
      this.listenTo(app.conn, 'connect:error', this.onConnectionError, this);
      this.listenTo(app.conn, 'disconnect', this.onConnectionDisconnect, this);
    },

    render: function() {
      this.$el.html(this.template());
      this.$selectBox = this.$('.connection-select');
      this.$btnConnect = this.$('.btn-connect');

      if (this.connections.length <= 0) {
        this.connections.fetch({
          reset: true
        });
      }
      return this;
    },

    onConnectionsFetchStart: function() {
      this.showLoadingBox();
    },

    onConnectionsFetchComplete: function() {
      this.hideLoadingBox();
    },

    onConnectionSelectChange: function() {
      console.log('ConnectionFormView.onConnectionSelectChange');
      var conn = this.connections.findWhere({
        endpoint: this.$selectBox.val()
      });
      if (conn && !app.conn.get('connected')) {
        app.conn.set(conn);
      }
    },

    onConnectionsReset: function() {
      console.log('ConnectionFormView.onConnectionsReset');
      this.refreshSelectBox();
    },

    onConnectionsAdd: function(model) {
      console.log('ConnectionFormView.onConnectionsAdd');
      this.$selectBox.append($('<option>').attr('value', model.get('endpoint')).html(model.get('endpoint')));
    },

    onConnectionsRemove: function() {
      console.log('ConnectionFormView.onConnectionsRemove');
      this.refreshSelectBox();
    },


    onConnectionStart: function() {
      console.log('ConnectionFormView.onConnectionStart');
      this.$btnConnect.html($('<img>').attr('src', 'assets/images/loader.gif')).append('Connecting');
    },

    onConnectionSuccess: function() {
      console.log('ConnectionFormView.onConnectionSuccess');
      this.hideLoadingBox();
      this.$btnConnect.html('Disconnect');
      this.$el.addClass('connected');
      this.$selectBox.prop('disabled', true);
    },

    onConnectionError: function() {
      console.log('ConnectionFormView.onConnectionError');
      this.hideLoadingBox();
    },

    onConnectionDisconnect: function() {
      console.log('ConnectionFormView.onConnectionDisconnect');
      this.$btnConnect.html('Connect');
      this.$el.removeClass('connected');
      this.$selectBox.prop('disabled', false);
    },

    showLoadingBox: function() {
      this.$('>:not(.loading-box)').addClass('hide');
      this.$('>.loading-box').removeClass('hide');
    },

    hideLoadingBox: function() {
      this.$('>:not(.loading-box)').removeClass('hide');
      this.$('>.loading-box').addClass('hide');
    },


    refreshSelectBox: function() {
      this.$selectBox.html();
      this.connections.each(function(conn) {
        this.$selectBox.append($('<option>').attr('value', conn.get('endpoint')).html(conn.get('endpoint')));
      }, this);

      if (app.conn.get('connected') && this.connections.indexOf(app.conn) >= 0) {
        this.$selectBox.val(app.conn.get('endpoint'));
      }
    },

    onBntConnectClick: function() {
      if (app.conn.get('connected')) {
        app.conn.disconnect();
      } else {
        app.conn.connect();
      }
    },

    onConnectionChange: function() {
      console.log('ConnectionFormView.onConnectionChange');
      if (this.connections.indexOf(app.conn) >= 0) {
        this.$selectBox.val(app.conn.get('endpoint'));
      }
    }

  });

  return ConnectionFormView;
});