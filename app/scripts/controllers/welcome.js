'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:WelcomeCtrl
 * @description
 * # WelcomeCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('WelcomeCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
