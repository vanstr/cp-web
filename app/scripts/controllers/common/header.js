'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('HeaderCtrl', function ($location, growl, $scope, authService) {
    $scope.accessRoles = authService.accessRoles;
    $scope.accessLevels = authService.accessLevels;
  });
