(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('AddBrew', AddBrew);

  AddBrew.$inject = ['$ionicHistory'];

  function AddBrew($ionicHistory) {

    var vm = this;
    vm.brews;
    vm.close = close;

    function close() {
      $ionicHistory.goBack();
    }

  };
})();
