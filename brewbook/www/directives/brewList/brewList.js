(function() {
  'use strict';
  angular.module('starter')
    .directive('bbBrewList', brewList);

  function brewList() {
    var directive = {
      scope: {
        tab: '@',
        brews: '='
      },
      templateUrl: 'directives/brewList/brewList.html',
      restrict: 'E',
      controller: BrewListController,
      controllerAs: 'bl' //imagePicker
    };
    return directive;
  }

  BrewListController.$inject = ['$scope', '$ionicPopup', '$ionicListDelegate', 'BrewService'];

  function BrewListController($scope, $ionicPopup, $ionicListDelegate, BrewService) {
    var bl = this;
    bl.removeBrew = removeBrew;

    function removeBrew(brew) {
      $ionicListDelegate.closeOptionButtons();
      $ionicPopup.show({
        template: '<p>Are you sure you want to remove this brew?</p>',
        title: 'Remove Brew',
        buttons: [{
          text: 'Cancel'
        }, {
          text: '<b>Remove</b>',
          type: 'button-assertive',
          onTap: function() { // lol get it?
            // Remove brew from current list
            var brewIndex = $scope.brews.indexOf(brew);
            $scope.brews.splice(brewIndex, 1)

            BrewService.removeBrew(brew);

          }
        }]
      });
      event.stopPropagation();
    }
  }
})();
