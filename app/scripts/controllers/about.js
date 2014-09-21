'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
