'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('ProfileCtrl',
        ['$scope', '$location','authService', 'growl', function ($scope, $location, authService, growl) {
            $scope.rememberme = true;
            $scope.user = authService.currentUser;

            $scope.deleteAccount = function () {
                console.log("delete Account");

                authService.deleteAccount(
                    function (res) {
                        $location.path('/');
                        growl.info("Account removed");
                    },
                    function (err) {
                        growl.error("Failed to login, check your username and password");
                    }

                );
            };

        }]);
