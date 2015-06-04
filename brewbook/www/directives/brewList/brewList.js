(function() {
  'use strict';
  angular.module('starter')
    .directive('bbBrewList', brewList);

  function brewList() {
    var directive = {
      scope: {
        tab: '@',
        brews: '='
      },
      templateUrl: 'directives/brewList/brewList.html',
      restrict: 'E'
    };
    return directive;
  };
})();
