'use strict';

/**
 * @ngdoc overview
 * @name cpWebApp
 * @description
 * # cpWebApp
 *
 * Main module of the application.
 */
angular
  .module('cpWebApp', [
    'ngCookies',
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
