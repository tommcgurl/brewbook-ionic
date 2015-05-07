(function() {
  'use strict'
  angular.module('starter.services')
    .factory('BrewService', BrewService);

  BrewService.$inject = ['$q', '$firebaseObject'];

  function BrewService($q, $firebaseObject) {
    var _url = 'https://brewbook-react.firebaseio.com/brews',
      _promise,
      _allBrews;

    // The services 'public' definition
    var brewService = {
      getBrewList: getBrewList
    };

    return brewService;

    /**
     * Fetches the brew object from firebase
     * then returns it as an array of individual brew objects
     */
    function getBrewList() {
        // Prepare a promise for the caller
        var deffered = $q.defer();

        _getBrews().then(function(brewObject) {
            deffered.resolve(_getAllBrews(brewObject));
        });

        // return promise to caller
        return deffered.promise;
    }

    /**
     * Get the brews from firebase and return a promise
     */
    function _getBrews() {
      // Check and see if we already have a promise, if so just return that
      if (_promise) {
        return _promise;
      }

      var ref = new Firebase(_url),
        res = $firebaseObject(ref);

      // Return a promise
      _promise = res.$loaded().then(function(data) {
        return data;
      });
      return _promise;
    }
    /**
     * Utility function for creating an array of brews
     * from our brew object
     */
    function _getAllBrews(brewObject) {
      // Check if we already have the array
      if (_allBrews) {
        return _allBrews;
      }

      // Create the array from the brews object
      var allBrews = [];
      brewObject.forEach(function(brewery) {
        allBrews.push.apply(allBrews, brewery);
      })

      return _allBrews = allBrews;
    }
  }
})();
