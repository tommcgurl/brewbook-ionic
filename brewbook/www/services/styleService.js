(function() {
  'use strict'
  angular.module('starter.services')
    .factory('StyleService', StyleService);

  // We may eventually move this off to our database
  function StyleService() {
    var _url = 'https://brewbook-ionic.firebaseio.com/brews',
      _promise,
      _allBrews,
      _allBreweries;

    // The services 'public' definition
    var styleService = {
      getStyles: getStyles
    };

    return styleService;

    /**
     * Returns and array of styles
     */
    function getStyles() {
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

  }
})();
