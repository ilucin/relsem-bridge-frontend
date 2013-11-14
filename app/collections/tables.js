define([
 'collections/base',
 'models/table'
], function(
  BaseCollection,
  TableModel
) {
  'use strict';

  var TablesCollection = BaseCollection.extend({
    model: TableModel
  });

  return TablesCollection;
});