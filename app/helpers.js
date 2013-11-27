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
    },

    removeNumbersFromEnd: function(string) {
      return string.replace(/[0-9]*\b/g, '');
    },

    killTheCamel: function(string) {
      return string.replace(/([a-z](?=[A-Z]))/g, '$1 ').toLowerCase();
    },

    getHtmlTableFromJson: function(data) {
      var result = '<div class="table-responsive"> <table class="table table-bordered"><tr>';

      _.forOwn(data[0], function(value, key) {
        if (key.indexOf('http://dbpedia.org/property/') === 0) {
          key = key.replace('http://dbpedia.org/property/', '');
        }
        result += ('<th>' + key + '</th>');
      });

      result += '</tr>';

      _.forEach(data, function(item) {
        result += '<tr>';
        _.forOwn(item, function(value) {
          result += ('<td>' + value + '</td>');
        }, this);
        result += '</tr>';
      }, this);

      result += '</table><div>';
      return result;
    }

  };

  return helpers;
});