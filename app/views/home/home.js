define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var HomeView = BaseView.extend({
    className: 'home container',
    template: app.fetchTemplate('home/home'),

    events: {
      'click .btn-connect': 'onBtnConnectClick'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onBtnConnectClick: function() {
      var name = this.$('.in-login-name').val();
      var endpoint = this.$('.in-login-endpoint').val();
      app.conn.connect(name, endpoint);
    }

  });

  return HomeView;
});