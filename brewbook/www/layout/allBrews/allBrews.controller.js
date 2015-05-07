(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Brews', Brews);

  Brews.$inject = ['BrewService'];

  function Brews(BrewService) {

    var vm = this;
    vm.brews;

    activate();

    function activate() {
      BrewService.getBrewList()
        .then(function(data) {
          vm.brews = data;
        });
    }

  };
})();
