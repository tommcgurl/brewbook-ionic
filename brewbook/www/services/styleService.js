(function() {
  'use strict'
  angular.module('starter.services')
    .factory('StyleService', StyleService);

  StyleService.$inject = ['$q', '$firebaseObject'];

  // We may eventually move this off to our database
  function StyleService($q, $firebaseObject) {
    var _url = 'https://brewbook-ionic.firebaseio.com/styles',
      _promise,
      _firebaseObject;

    // The services 'public' definition
    var styleService = {
      getStyleOptions: getStyleOptions,
      getStyleList: getStyleList,
      getBrewsByStyle: getBrewsByStyle,
      _addBrew: _addBrew,
      _removeBrew: _removeBrew
    };

    return styleService;

    /**
     * Returns and array of styles
     */
    function getStyleOptions() {
      return ['APA', 'Ale', 'Altbier',
        'Amber Ale', 'Belgian Dark Ale',
        'Belgian IPA',
        'Belgian Strong Ale', 'Barley Wine',
        'Blonde Ale',
        'Bock', 'Brown Ale', 'Double IPA', 'Dubbel', 'Gose',
        'Harvest Ale', 'Hefeweizen', 'Imperial IPA', 'IPA', 'Kolch',
        'Lager', 'Milk Stout',
        'Kktoberfest', 'Pale Ale', 'Pilsner',
        'Porter', 'Pumpkin Ale', 'Pumpkin Stout', 'Red Ale',
        'Rye Ale',
        'Rye Pale Ale',
        'Rye IPA', 'Saison', 'Session Ale', 'Shandy', 'Stout', 'Wheat Beer', 'White IPA', 'Other'
      ];
    }


    /**
     * Get the brews from firebase and return a promise
     */
    function _getStyles() {
      // Check and see if we already have a promise, if so just return that
      if (_promise) {
        return _promise;
      }

      var ref = new Firebase(_url);

      _firebaseObject = $firebaseObject(ref);

      // Return a promise
      _promise = _firebaseObject.$loaded()
        .then(function(data) {
          return data;
        });
      return _promise;
    }

    function _addBrew(brew) {
      var styleKey = brew.style.replace(/\W/g, '').toLowerCase(),
        deffered = $q.defer();

      _getStyles().then(function(brewObject) {
        _addBrewToStylesObject(brew, deffered);
      });

      return deffered;
    }

    function _removeBrew(brew) {
      var styleKey = brew.style.replace(/\W/g, '').toLowerCase(),
        deffered = $q.defer();

      _getStyles().then(function(brewObject) {
        _removeBrewFromStylesObject(brew, deffered);
      });

      return deffered;
    }

    function _addBrewToStylesObject(brew, deffered) {
      var styleKey = brew.style.replace(/\W/g, '').toLowerCase();

      if (_firebaseObject[styleKey]) {
        _firebaseObject[styleKey].push(brew);
      } else {
        _firebaseObject[styleKey] = [brew];
      }

      _saveStylesObject(deffered);
    }

    function _removeBrewFromStylesObject(brew, deffered) {
       var styleKey = brew.style.replace(/\W/g, '').toLowerCase();

       _removeFromArray(_firebaseObject[styleKey], brew);

       _saveStylesObject(deffered);
    }

    function _saveStylesObject(deffered) {
      _firebaseObject.$save().then(function(ref) {
        ref.key() === _firebaseObject.$id; // true
        deffered.resolve(_firebaseObject);
      }, function(error) {
        console.log("Error:", error);
      });
    }

    function _removeFromArray(array, brew) {
      var brewIndex = array.indexOf(brew);
      array.splice(brewIndex, 1);
    }

    function getBrewsByStyle(styleId) {
      var deffered = $q.defer();

      _getStyles().then(function(styleObject) {
        deffered.resolve(styleObject[styleId]);
      });

      return deffered.promise;
    }

    function getStyleList() {
      // Prepare a promise for the caller
      var deffered = $q.defer();

      _getStyles().then(function(brewObject) {
        deffered.resolve(_getAllStyles(brewObject));
      });

      // return promise to caller
      return deffered.promise;
    }

    function _getAllStyles(brewObject) {
      var allStyles = [];
      brewObject.forEach(function(style) {
        allStyles.push(style[0].style);
      });

      return allStyles;
    }
  }
})();
