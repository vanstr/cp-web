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
                            $location.path('/');
                        },
                        function (err) {
                            $rootScope.error = "Failed to login";
                        });
            };

            $scope.loginWithDropbox = function () {
                var DROPBOX_AUTH_COMPLETE_URL = "http://localhost:8080/dropboxAuthComplete";
                var DROPBOX_CLIENT_ID = "15m7p3devkbyc7z";
                window.location.href = "https://www.dropbox.com/1/oauth2/authorize?client_id="+ DROPBOX_CLIENT_ID+"&response_type=code&redirect_uri="+DROPBOX_AUTH_COMPLETE_URL;
            };



        }]);
