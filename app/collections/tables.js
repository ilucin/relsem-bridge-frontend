define([
	'backbone',
	'models/table'
], function(
	Backbone,
	TableModel
) {
	'use strict';

	var TablesCollection = Backbone.Collection.extend({
		model: TableModel
	});

	return TablesCollection;
});