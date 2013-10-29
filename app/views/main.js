define([
  'app',
  'views/base'
], function(
  app,
  BaseView
) {

  var MainView = BaseView.View.extend({
    template: app.fetchTemplate('main'),

    render: function() {
      this.$el.html(this.template());
      return this;
    }

  });

  return MainView;
});