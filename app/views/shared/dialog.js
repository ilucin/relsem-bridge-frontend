define([
  'app',
  'backbone'
], function(
  app,
  Backbone
) {
  'use strict';
  var DialogView = Backbone.View.extend({
    className: 'dialog-mask',
    template: app.fetchTemplate('shared/dialog'),
    events: {
      'click .btn-left': 'onBtnLeftClick',
      'click .btn-right': 'onBtnRightClick'
    },

    show: function(options) {
      this.options = options || this.options;
      $('body').append(this.render().$el);
      this.setListeners();
    },

    hide: function() {
      this.$el.detach();
      this.clearListeners();
    },

    setListeners: function() {},

    clearListeners: function() {
      this.off();
    },

    render: function() {
      var data = {
        title: this.options.title,
        message: this.options.message,
        left: this.options.left.text,
        right: this.options.right ? (this.options.right.text || '') : ''
      };
      this.$el.html(this.template(data));

      return this;
    },

    onBtnLeftClick: function() {
      if (this.options.left && this.options.left.callback) {
        this.options.left.callback();
      }
      this.hide();
    },

    onBtnRightClick: function() {
      if (this.options.right && this.options.right.callback) {
        this.options.right.callback();
      }
      this.hide();
    }


  });

  return DialogView;
});