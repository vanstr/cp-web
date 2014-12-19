'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('HeaderCtrl', ['$location', 'growl', '$scope', 'authService',
        function ($location, growl, $scope, authService) {

            $scope.logout = function () {
                authService.logout(
                    function (res) {
                        $location.path('/');
                        growl.info("Logged out");
                    },
                    function (err) {
                        growl.error("Failed to logout");
                    });
            };

    $scope.accessRoles = authService.accessRoles;
    $scope.accessLevels = authService.accessLevels;
  }]);
