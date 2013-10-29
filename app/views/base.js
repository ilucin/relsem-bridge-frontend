define([
  'Backbone',
  'app'
], function(
  Backbone,
  app
) {

  var BaseView = Backbone.View.extend({

    render: function() {
      return this;
    }

  });

  return BaseView;
});