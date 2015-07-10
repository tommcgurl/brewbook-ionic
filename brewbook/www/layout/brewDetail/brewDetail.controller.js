(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('BrewDetail', BrewDetail);

  BrewDetail.$inject = ['$scope', '$stateParams', 'BrewService'];

  function BrewDetail($scope, $stateParams, BrewService) {

    var vm = this;
    vm.brew;

    activate();

    function activate() {
      var brewery = $stateParams.brewery,
        brew = $stateParams.brewName;

      BrewService.getBrewDetail(brewery, brew)
        .then(function(data) {
          vm.brew = data;
        });
    }

  };
})();
