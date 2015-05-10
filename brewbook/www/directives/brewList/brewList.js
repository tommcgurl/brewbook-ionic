(function() {
  'use strict';
  angular.module('starter')
    .directive('bbBrewList', brewList);

  function brewList() {
    var directive = {
      scope: {
        brews: '='
      },
      templateUrl: '/directives/brewList/brewList.html',
      restrict: 'E'
    };
    return directive;
  };
})();
