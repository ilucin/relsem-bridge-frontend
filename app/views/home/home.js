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
      'click .btn-login': 'onBtnLoginClick'
    },

    render: function() {
      this.$el.html(this.template());
      return this;
    },

    onBtnLoginClick: function() {
      var username = this.$('.in-login-username').val();
      var password = this.$('.in-login-password').val();
      app.user.login(username, password);
      Backbone.trigger('navigate', 'editor');
    }

  });

  return HomeView;
});