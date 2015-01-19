'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('SigninCtrl', function ($rootScope, $scope, $location, $window, authService, growl) {
            $scope.rememberme = true;
            $scope.user = authService.currentUser;


            $scope.login = function () {
                authService.login({
                            login: $scope.username,
                            password: $scope.password,
                            rememberme: $scope.rememberme // TODO implement in core
                        },
                        function (res) {
                            $rootScope.$broadcast('login', []);
                            growl.success("Login successful");
                            $location.path('/player');
                        },
                        function (err) {
                            growl.error("Failed to login, check your username and password");
                            $rootScope.error = "Failed to login";
                        });
            };

            $scope.loginWithDropbox = function () {
                authService.dropboxAuthURL().then((function(data){
                    window.location.href = data;
                }));
            };
            $scope.loginWithGDrive = function () {
                authService.gdriveAuthURL().then((function(data){
                    window.location.href = data;
                }));
            };


        });
