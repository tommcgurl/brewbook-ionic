(function() {
  'use strict'
  angular.module('starter.services')
    .factory('BrewService', BrewService);

  BrewService.$inject = ['$q', '$firebaseObject']

  function BrewService($q, $firebaseObject) {
    var _url = 'https://brewbook-react.firebaseio.com/brews',
      _promise;

    // The services 'public' definition
    var brewService = {
      getAll: _getBrews
    };

    return brewService;

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
        return _brewObject = data;
      });
      return _promise;
    }
  }
})();
