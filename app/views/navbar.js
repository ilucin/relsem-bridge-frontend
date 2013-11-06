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
    events: {
      'click .btn-logout': 'onBtnLogoutClick'
    },

    initialize: function() {
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(app.user, 'change', this.onUserChange, this);
    },

    onUserChange: function() {
      if (app.user.has('username')) {
        this.$('.btn-logout')
          .html('Logout ' + app.user.get('username'))
          .removeClass('hide');
      } else {
        this.$('.btn-logout')
          .addClass('hide');
      }
    },

    onBtnLogoutClick: function() {
      app.user.logout();
    }

  });

  return NavbarView;
});