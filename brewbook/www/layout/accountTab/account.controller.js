(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Account', Account);

  function Account($scope) {
    $scope.settings = {
      enableFriends: true
    };

  }
})();
