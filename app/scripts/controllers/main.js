'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
