(function() {
  'use strict';
  angular.module('starter')
    .directive('bbSelectMenu', SelectMenu);

  function SelectMenu() {
    var directive = {
      scope: {
        title: '@',
        side: '@',
        select: '&',
        options: '='
      },
      templateUrl: 'directives/selectMenu/selectMenu.html',
      restrict: 'E',
      compile: function(tElement, tAttrs) {
        // Modify the templates 'side' attribute
        var ionSideMenu = tElement.children()[0];
        ionSideMenu.setAttribute('side', tAttrs.side);
      }

    };
    return directive;
  };
})();
