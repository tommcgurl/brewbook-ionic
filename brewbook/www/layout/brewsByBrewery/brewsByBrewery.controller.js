(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('BrewsByBrewery', BrewsByBrewery);

  BrewsByBrewery.$inject = ['$scope', '$stateParams', 'BrewService'];

  function BrewsByBrewery($scope, $stateParams, BrewService) {

    var vm = this;
    vm.brews;

    /*
     * Make sure we are always getting the latest data
     * by bypassing ionic's controller caching and refetching
     */
    $scope.$on('$ionicView.beforeEnter', activate);

    activate();

    function activate() {
      BrewService.getBrewsByBrewery($stateParams.brewery)
        .then(function(data) {
          vm.brews = data;
          vm.brewery = data[0].brewery;
        });
    }

  };
})();
