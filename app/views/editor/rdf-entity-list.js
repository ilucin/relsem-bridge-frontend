define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var RdfEntityListView = BaseView.extend({
    className: 'rdf-entity-list-view',
    template: app.fetchTemplate('editor/rdf-entity-list'),
    disabled: false,

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    setListeners: function() {
      this.listenTo(app.conn, 'connect:success', this.onConnect, this);
      this.listenTo(app.conn, 'disconnect', this.onDisconnect, this);
    },

    onConnect: function() {
      this.disabled = true;
      this.$el.html(this.template());
      this.$el.removeClass('disabled');
    },

    onDisconnect: function() {
      this.disabled = true;
      this.$el.html('');
      this.$el.addClass('disabled');
    }
  });

  return RdfEntityListView;
});