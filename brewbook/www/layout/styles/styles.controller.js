(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Styles', Styles);

  Styles.$inject = ['$scope', 'StyleService'];

  function Styles($scope, StyleService) {

    var vm = this;
    vm.styles;

    /*
     * Make sure we are always getting the latest data
     * by bypassing ionic's controller caching and refetching
     */
    $scope.$on('$ionicView.beforeEnter', activate);

    activate();

    function activate() {
      StyleService.getStyleList()
        .then(function(data) {
          vm.styles = data;
        });
    }

  };
})();
