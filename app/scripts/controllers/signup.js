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
    ['$rootScope', '$scope', '$location', '$window', 'authService', 'growl', function ($rootScope, $scope, $location, $window, authService, growl) {

        $scope.signUp = function () {
            authService.register({
                        login: $scope.username,
                        password: $scope.password
                    },
                    function (res) {
                        $location.path('/signin');
                        growl.info("Registration successful, plaese login");
                    },
                    function (err) {
                        growl.error("Failed to signup");
                    });
        };

    }]);
