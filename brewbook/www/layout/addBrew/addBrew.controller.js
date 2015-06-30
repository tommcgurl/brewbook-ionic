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
    vm.setReadonly = setReadonly
    vm.save = save;
    vm.styleReadonly = true;
    vm.breweryReadonly = true;
    vm.brew = {};

    var styleInput,
      breweryInput;

    activate();

    function activate() {
      getBreweries();
      getStyles();
    }

    function getBreweries() {
      BrewService.getBreweryList()
        .then(function(data) {
          vm.breweries = data;
          // add the 'other' option to the list
          vm.breweries.push('Other');
        });
    }

    function getStyles() {
      vm.styles = StyleService.getStyles()
    }

    function close() {
      $ionicHistory.goBack();
    }

    function toggleRight(e) {
      breweryInput = breweryInput || e.currentTarget;
      $ionicSideMenuDelegate.toggleRight();
    }

    function toggleLeft(e) {
      styleInput = styleInput || e.currentTarget;
      $ionicSideMenuDelegate.toggleLeft();
    }

    function onSelectStyle(style) {
      if (style === 'Other') {
        // Focus in on the input field after the menu has closed
        setTimeout(function() {
          vm.styleReadonly = false;
          styleInput.select();
          styleInput.focus();
          _openKeyboard();
        }, 0);
      }

      vm.brew.style = style
      toggleLeft();
    }

    function onSelectBrewery(brewery) {
      if (brewery === 'Other') {
        setTimeout(function() {
          vm.breweryReadonly = false;
          breweryInput.select();
          breweryInput.focus();
          _openKeyboard();
        }, 0);
      }
      vm.brew.brewery = brewery;
      toggleRight();
    }

    function save() {
      BrewService.addBrew(vm.brew);
      // Now close the add brew view
      close();
    }

    function setReadonly(e) {
      if (e.target.placeholder === 'Style') {
        vm.styleReadonly = true;
      } else {
        vm.breweryReadonly = true;
      }
    }

    function _openKeyboard() {
      try {
        cordova.plugins.Keyboard.show();
      } catch (e) {
        console.log('Not running via cordova');
      }
    }
  }
})();
