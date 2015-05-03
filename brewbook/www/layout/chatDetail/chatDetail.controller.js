(function() {
  'use strict'
  angular.module('starter.controllers')
    .controller('ChatDetail', ChatDetail);

  ChatDetail.$inject = ['$scope', '$stateParams', 'ChatService'];

  function ChatDetail($scope, $stateParams, ChatService) {
    $scope.chat = ChatService.get($stateParams.chatId);
  }
})();
