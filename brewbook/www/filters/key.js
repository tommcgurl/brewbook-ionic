(function() {
  'use strict';
  angular.module('starter')
    .filter('key', Key);

  function Key() {
    return function(input) {
      if (!input) {
        return;
      }
      return input.replace(/[^a-z0-9]/ig, '').toLowerCase();
    };
  };
})();
