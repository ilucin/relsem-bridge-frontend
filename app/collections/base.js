define([
  'backbone',
], function(
  Backbone
) {
  'use strict';

  var BaseCollection = Backbone.Collection.extend({

    fetch: function(options) {
      this.trigger('fetch:start');
      options = options || {};

      _.extend(options, {
        complete: this.onFetchComplete.bind(this)
      });

      Backbone.Collection.prototype.fetch.call(this, options);
    },

    onFetchComplete: function() {
      this.trigger('fetch:complete');
    }

  });

  return BaseCollection;
});