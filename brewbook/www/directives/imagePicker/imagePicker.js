(function() {
  'use strict';
  angular.module('starter')
    .directive('bbImagePicker', ImagePicker);

  function ImagePicker() {
    var directive = {
      templateUrl: 'directives/imagePicker/imagePicker.html',
      restrict: 'E',
      controller: ImageController,
      controllerAs: 'ip' //imagePicker

    };
    return directive;
  }

  ImageController.$inject = ['$scope', '$ionicPopup', 'ImageService']

  function ImageController($scope, $ionicPopup, ImageService) {
    var ip = this;
    ip.getPic = getPic;
    ip.editPic = editPic;
    ip.removePic = removePic;
    ip.imageURI = '';

    function getPic() {
      ImageService.getPic()
        .then(function(imageURI) {
          ip.imageURI = imageURI;
        });
    }

    function removePic() {
      $ionicPopup.show({
        template: '<p>Are you sure you want to remove this image?</p>',
        title: 'Remove Image',
        buttons: [{
          text: 'Cancel'
        }, {
          text: '<b>Remove</b>',
          type: 'button-assertive',
          onTap: function() {
            ip.imageURI = ''
          }
        }]
      });
      event.stopPropagation();
    }

    function editPic() {
      showPopup('Change Pic', 'Would you like to change this image?')
        .then(function(res) {
          if (res) {
            getPic();
          }
        });
      event.stopPropagation();
    }

    function showPopup(title, template) {
      return $ionicPopup.confirm({
        title: title,
        template: template
      });
    }
  }
})();
