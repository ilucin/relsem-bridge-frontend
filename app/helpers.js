define([], function() {
  'use strict';

  var helpers = {

    base64src: 'data:image/jpeg;base64,',

    getUrlParameterByName: function(name) {
      name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
      var regexS = '[\\?&]' + name + '=([^&#]*)';
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if (results === null) {
        return '';
      } else {
        return decodeURIComponent(results[1].replace(/\+/g, ' '));
      }
    },

    validateBool: function(value) {
      return value === true || value === false;
    }

  };

  return helpers;
});