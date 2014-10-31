'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$location', 'authService', '$window',
        function ($rootScope, $scope, $location, authService, $window) {

            $scope.logout = function () {
                authService.logout(
                    function (res) {
                        $location.path('/');
                        $window.location.reload();
                    },
                    function (err) {
                        $rootScope.error = "Failed to logout";
                    });
            };

    $scope.accessRoles = authService.accessRoles;
    $scope.accessLevels = authService.accessLevels;
  }]);
