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
        ['$rootScope', '$scope', '$location', '$window', 'Auth', function ($rootScope, $scope, $location, $window, Auth) {
            $scope.rememberme = true;
            $scope.user = Auth.currentUser;


            $scope.login = function () {
                Auth.login({
                            login: $scope.username,
                            password: $scope.password,
                            rememberme: $scope.rememberme // TODO implement in core
                        },
                        function (res) {
                            $location.path('/');
                        },
                        function (err) {
                            $rootScope.error = "Failed to login";
                        });
            };

        }]);
