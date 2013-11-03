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

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return RdfEntityListView;
});