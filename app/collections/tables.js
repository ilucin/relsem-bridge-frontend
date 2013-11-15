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
    url: app.localMode ? 'mock/tables.json' : app.apiRoot + '/tables'
  });

  return TablesCollection;
});