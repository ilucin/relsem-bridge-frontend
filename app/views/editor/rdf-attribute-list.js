define([
  'app',
  'views/abstract/base'
], function(
  app,
  BaseView
) {
  'use strict';

  var RdfAttributeListView = BaseView.extend({
    className: 'rdf-attribute-list-view',
    template: app.fetchTemplate('editor/rdf-attribute-list'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return RdfAttributeListView;
});