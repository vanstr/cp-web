'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('HeaderCtrl', ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope, $scope, $location, Auth) {
    $scope.logout = function () {
        Auth.logout(
            function (res) {                	
                $location.path('/');
            },
            function (err) {
                $rootScope.error = "Failed to logout";
            });
    };

    $scope.accessRoles = Auth.accessRoles;
    $scope.accessLevels = Auth.accessLevels;
  }]);
