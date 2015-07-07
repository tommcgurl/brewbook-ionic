(function() {
  'use strict'
  angular.module('starter.services')
    .factory('BrewService', BrewService);

  BrewService.$inject = ['$q', '$firebaseObject', 'StyleService'];

  function BrewService($q, $firebaseObject, StyleService) {
    var _url = 'https://brewbook-ionic.firebaseio.com/brews',
      _promise,
      _firebaseObject,
      _allBreweries;

    // The services 'public' definition
    var brewService = {
      getBrewList: getBrewList,
      getBreweryList: getBreweryList,
      getBrewsByBrewery: getBrewsByBrewery,
      getBrewDetail: getBrewDetail,
      addBrew: _addBrew
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
     * Fetches a list of formatted brewery names
     */
    function getBreweryList() {
      // Prepare a promise for the caller
      var deffered = $q.defer();

      _getBrews().then(function(brewObject) {
        deffered.resolve(_getAllBreweries(brewObject));
      });

      // return promise to caller
      return deffered.promise;
    }

    function getBrewsByBrewery(breweryID) {
      var deffered = $q.defer();

      _getBrews().then(function(brewObject) {
        deffered.resolve(brewObject[breweryID]);
      });

      return deffered.promise;
    }

    function getBrewDetail(breweryID, brewName) {
      var deffered = $q.defer();

      _getBrews().then(function(brewObject) {
        deffered.resolve(_getBrewDetail(brewObject, breweryID, brewName))
      })

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
      var breweryKey = brew.brewery.replace(/\W/g, '').toLowerCase(),
        savedToBrewObject = $q.defer(),
        savedToStyleObject = $q.defer(),
        promises = [
          savedToBrewObject,
          savedToStyleObject
        ];

      if (_firebaseObject[breweryKey]) {
        _firebaseObject[breweryKey].push(brew);
      } else {
        _firebaseObject[breweryKey] = [brew];
      }

      _firebaseObject.$save().then(function(ref) {
        ref.key() === _firebaseObject.$id; // true
        savedToBrewObject.resolve()
      }, function(error) {
        console.log("Error:", error);
      });

      savedToStyleObject = StyleService._addBrew(brew);
      return $q.all(promises)
    }

    /**
     * Utility function for creating an array of brews
     * from our brew object
     */
    function _getAllBrews(brewObject) {
      // Create the array from the brews object
      var allBrews = [];
      brewObject.forEach(function(brewery) {
        allBrews.push.apply(allBrews, brewery);
      })

      return allBrews;
    }

    function _getAllBreweries(brewObject) {

      var allBreweries = [];
      brewObject.forEach(function(brewery) {
        allBreweries.push(brewery[0].brewery);
      });

      return allBreweries;
    }

    function _getBrewDetail(brewObject, breweryID, brewName) {
      var brewArray = brewObject[breweryID];
      return brewArray.filter(function(brew) {
        return brew.name === brewName;
      })[0];
    }
  }
})();
