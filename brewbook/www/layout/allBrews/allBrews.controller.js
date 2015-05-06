(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Brews', Brews);

  Brews.$inject = ['$scope', 'BrewService'];

  function Brews($scope, BrewService) {

    var vm = this;
    vm.brews;

    activate();

    function activate() {
      BrewService.getBrewList()
        .then(function(data) {
          console.log(data);
          vm.brews = data;
        });
    }

  };
})();
