(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Breweries', Breweries);

  Breweries.$inject = ['$scope', 'BrewService'];

  function Breweries($scope, BrewService) {

    var vm = this;
    vm.breweries;

    /*
     * Make sure we are always getting the latest data
     * by bypassing ionic's controller caching and refetching
     */
    $scope.$on('$ionicView.beforeEnter', activate);

    activate();

    function activate() {
      BrewService.getBreweryList()
        .then(function(data) {
          vm.breweries = data;
        });
    }

  };
})();
