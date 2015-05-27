(function() {
  'use strict';
  angular.module('starter.controllers')
    .controller('AddBrew', AddBrew);

  AddBrew.$inject = ['$ionicHistory', '$ionicSideMenuDelegate', 'BrewService', 'StyleService'];

  function AddBrew($ionicHistory, $ionicSideMenuDelegate, BrewService, StyleService) {

    var vm = this;
    vm.brews;
    vm.close = close;
    vm.toggleRight = toggleRight;
    vm.toggleLeft = toggleLeft;
    vm.breweries;
    vm.styles;
    vm.onSelectStyle = onSelectStyle;
    vm.onSelectBrewery = onSelectBrewery;
    vm.brew = {};

    activate();

    function activate() {
      getBreweries();
      getStyles();
    }

    function getBreweries() {
      BrewService.getBreweryList()
        .then(function(data) {
          vm.breweries = data;
        });
    }

    function getStyles() {
      vm.styles = StyleService.getStyles()
    }

    function close() {
      $ionicHistory.goBack();
    }

    function toggleRight() {
      $ionicSideMenuDelegate.toggleRight();
    }

    function toggleLeft() {
      $ionicSideMenuDelegate.toggleLeft();
    }

    function onSelectStyle(style) {
      vm.brew.style = style
      toggleLeft();
    }

    function onSelectBrewery(brewery) {
      vm.brew.brewery = brewery;
      toggleRight();
    }
  };
})();
