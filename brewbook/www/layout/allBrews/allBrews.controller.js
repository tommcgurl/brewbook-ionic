(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Brews', Brews);

  Brews.$inject = ['$scope', 'BrewService'];

  function Brews($scope, BrewService) {

    var vm = this;
    vm.brews;

    /*
     * Make sure we are always getting the latest data
     * by bypassing ionic's controller caching and refetching
     */
    $scope.$on('$ionicView.beforeEnter', activate);

    activate();

    function activate() {
      BrewService.getBrewList()
        .then(function(data) {
          vm.brews = data;
        });
    }

  };
})();
