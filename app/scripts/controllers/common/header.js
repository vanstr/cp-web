'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('HeaderCtrl', ['$rootScope', '$scope', 'authService',
        function ($rootScope, $scope, authService) {

            $scope.logout = function () {
                authService.logout(
                    function (res) {
                        window.location.href = "/";
                    },
                    function (err) {
                        $rootScope.error = "Failed to logout";
                    });
            };

    $scope.accessRoles = authService.accessRoles;
    $scope.accessLevels = authService.accessLevels;
  }]);
