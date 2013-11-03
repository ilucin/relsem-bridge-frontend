define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var RdfPanelView = BaseView.extend({
    className: 'rdf-panel-view',
    template: app.fetchTemplate('editor/rdf-panel'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return RdfPanelView;
});