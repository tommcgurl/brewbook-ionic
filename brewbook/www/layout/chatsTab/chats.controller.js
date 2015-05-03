(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('Chats', Chats);

  Chats.$inject = ['$scope', 'ChatService'];

  function Chats($scope, ChatService) {
    $scope.chats = ChatService.all();
    $scope.remove = function(chat) {
      Chats.remove(chat);
    }
  }
})();
