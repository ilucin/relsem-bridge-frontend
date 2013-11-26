define([
  'backbone',
], function(
  Backbone
) {
  'use strict';

  var BaseCollection = Backbone.Collection.extend({

    fetch: function(options) {
      options = options || {};
      _.extend(options, {
        complete: this.onFetchComplete.bind(this)
      });

      this.trigger('fetch:start', options);
      Backbone.Collection.prototype.fetch.call(this, options);
    },

    onFetchComplete: function() {
      this.trigger('fetch:complete');
    }

  });

  return BaseCollection;
});