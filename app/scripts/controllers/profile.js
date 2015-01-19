'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:SigninCtrl
 * @description
 * # SigninCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('ProfileCtrl',  function ($scope, $rootScope, $location, authService, growl) {

        $scope.currentPassword = "";
        $scope.newPassword = "";
        $scope.newLogin = "";
        $scope.name = $rootScope.user.name;
        $scope.email = $rootScope.user.email;

        $scope.deleteAccount = function () {
            console.log("delete Account");

            authService.deleteAccount(
                function (res) {
                    $location.path('/');
                    growl.info("Account removed", {ttl: 5000});
                },
                function (err) {
                    growl.error("Failed to login, check your username and password");
                }
            );
        };

        $scope.changePassword = function () {
            console.log("changePassword");

            authService.changeUserPassword(
                $scope.currentPassword,
                $scope.newPassword,
                function (res) {
                    growl.success("Password changed");
                    $scope.currentPassword = "";
                    $scope.newPassword = "";
                    automaticLogoutToCheckPwd();
                },
                function (err) {
                    growl.error("Failed to change your password: " + err);
                }
            );
        };

        $scope.linkToAccount = function () {
            console.log("linkToAccount");

            var user = {login: $scope.newLogin, password: $scope.newPassword};
            authService.addLoginAndPasswordForExistingUser(
                user,
                function (res) {
                    growl.success("Account linked");
                    $scope.newPassword = "";
                    $scope.newLogin = "";
                    automaticLogoutToCheckPwd();
                },
                function (err) {
                    growl.error("Failed to link account: " + err);
                }
            );
        };


        $scope.updatePersonalInfo = function () {
            console.log("updatePersonalInfo");

            var user = {name: $scope.name, email: $scope.email};
            authService.updateUserInfo(
                user,
                function (res) {
                    growl.success("Personal info updated");
                },
                function (err) {
                    growl.error("Failed to update personal info: " + err);
                }
            );
        };

        var automaticLogoutToCheckPwd = function () {
            authService.logout(
                function (res) {
                    $location.path('/signin');
                    growl.info("Automatic logged out, check your password", {ttl: 5000});
                },
                function (err) {
                    growl.error("System error: failed to logout");
                }
            );
        };

    });
