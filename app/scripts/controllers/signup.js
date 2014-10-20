'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:SignupCtrl
 * @description
 * # SignupCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
  .controller('SignupCtrl',
    ['$rootScope', '$scope', '$location', '$window', 'authService', function ($rootScope, $scope, $location, $window, authService) {

        $scope.signUp = function () {
            authService.register({
                        login: $scope.username,
                        password: $scope.password
                    },
                    function (res) {
                        $location.path('/signin');
                    },
                    function (err) {
                        $rootScope.error = "Failed to login";
                    });
        };

    }]);
