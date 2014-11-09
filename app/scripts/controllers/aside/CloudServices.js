'use strict';


angular.module('cpWebApp')
    .controller('CloudServicesCtrl', ['$scope', 'authService', function ($scope, authService) {

        $scope.addGDrive = function () {
            authService.gdriveAuthURL().then((function (data) {
                console.log("addGDrive : " + data);
                window.location.href = data;
            }));
        }

        $scope.deleteGDrive= function () {
            console.log("delete gdrive acc");
            authService.gdriveDelete().then((function (data) {
                window.location.href = "/";
            }));
        }

        $scope.addDropbox= function () {
            authService.dropboxAuthURL().then((function (data) {
                console.log("loginWithDropbox : " + data);
                window.location.href = data;
            }));
        }

        $scope.deleteDropbox= function () {
            console.log("delete dropbox acc");
            authService.dropboxDelete().then((function (data) {
                window.location.href = "/";
            }));
        }

        $scope.hasDropboxAccount = function () {
            console.log("d ac: "+ authService.user['dropboxUid']);
            return (typeof authService.user['dropboxUid'] != 'undefined')
                && (authService.user['dropboxUid'] != null)
                && (authService.user['dropboxUid'] != "");
        }

        $scope.hasGDriveAccount = function () {
            return (typeof authService.user['googleEmail'] != 'undefined')
                && (authService.user['googleEmail'] != null)
                && (authService.user['googleEmail'] != "");
        };


    }]);
