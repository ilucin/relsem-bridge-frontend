define([
  'app',
  'collections/base',
  'models/table'
], function(
  app,
  BaseCollection,
  TableModel
) {
  'use strict';

  var TablesCollection = BaseCollection.extend({
    model: TableModel,

    url: function() {
      return app.localMode ? 'mock/tables.json' : (app.apiRoot + 'schema');
    },

    parse: function(response) {
      return response.tables;
    }

  });

  return TablesCollection;
});