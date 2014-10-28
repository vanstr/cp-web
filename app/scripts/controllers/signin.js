'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('SigninCtrl',
        ['$rootScope', '$scope', '$location', '$window', 'authService', function ($rootScope, $scope, $location, $window, authService) {
            $scope.rememberme = true;
            $scope.user = authService.currentUser;


            $scope.login = function () {
                authService.login({
                            login: $scope.username,
                            password: $scope.password,
                            rememberme: $scope.rememberme // TODO implement in core
                        },
                        function (res) {
                            $location.path('/player');
                        },
                        function (err) {
                            $rootScope.error = "Failed to login";
                        });
            };

        }]);
