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

  BrewListController.$inject = ['$ionicPopup', 'BrewService'];

  function BrewListController($ionicPopup, BrewService) {
    var bl = this;
    bl.removeBrew = removeBrew;

    function removeBrew(brew) {
      $ionicPopup.show({
        template: '<p>Are you sure you want to remove this brew?</p>',
        title: 'Remove Brew',
        buttons: [{
          text: 'Cancel'
        }, {
          text: '<b>Remove</b>',
          type: 'button-assertive',
          onTap: function() { // lol get it?
            // BrewService.removeBrew(brew);
            // Remove beer;
          }
        }]
      });
      event.stopPropagation();
    }
  }
})();
