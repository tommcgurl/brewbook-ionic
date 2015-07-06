(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('BrewsByStyle', BrewsByStyle);

  BrewsByStyle.$inject = ['$scope', '$stateParams', 'StyleService'];

  function BrewsByStyle($scope, $stateParams, StyleService) {

    var vm = this;
    vm.brews;

    /*
     * Make sure we are always getting the latest data
     * by bypassing ionic's controller caching and refetching
     */
    $scope.$on('$ionicView.beforeEnter', activate);

    activate();

    function activate() {
      StyleService.getBrewsByStyle($stateParams.style)
        .then(function(data) {
          vm.brews = data;
          vm.style = data[0].style;
        });
    }

  };
})();
