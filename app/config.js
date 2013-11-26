require.config({
  deps: ['main'],

  paths: {
    // JavaScript folders.
    libs: '../assets/js/libs',
    plugins: '../assets/js/plugins',

    // Libraries.
    jquery: '../assets/js/libs/jquery-2.0.3',

    //underscore replacment
    underscore: '../assets/js/libs/lodash',
    //backbone
    backbone: '../assets/js/libs/backbone',
    bootstrap: '../assets/js/libs/bootstrap',
    jqueryui: '../assets/js/libs/jquery-ui-1.10.3.custom.min'
  },

  shim: {
    backbone: {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },

    jquery: {
      exports: '$'
    },

    jqueryui: {
      deps: ['jquery']
    },

    bootstrap: {
      deps: ['jquery']
    }
  }

});