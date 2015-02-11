'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:LogoutController
 * @description
 * # LogoutCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('LogoutCtrl', function ($location, growl, authService) {
    authService.logout(
      function () {
        $location.path('/');
        growl.info("Logged out");
      },
      function () {
        growl.error("Failed to logout");
      });
  });
