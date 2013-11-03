define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var EditorView = BaseView.extend({
    className: 'editor-view',
    template: app.fetchTemplate('editor/editor'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return EditorView;
});