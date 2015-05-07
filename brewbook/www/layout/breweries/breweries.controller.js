(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Breweries', Breweries);

  Breweries.$inject = ['BrewService'];

  function Breweries(BrewService) {

    var vm = this;
    vm.breweries;

    activate();

    function activate() {
      BrewService.getBreweryList()
        .then(function(data) {
          vm.breweries = data;
        });
    }

  };
})();
