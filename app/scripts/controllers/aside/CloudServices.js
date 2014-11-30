'use strict';


angular.module('cpWebApp')
    .controller('CloudServicesCtrl', ['$scope', 'authService', function ($scope, authService) {

        $scope.hasDropboxAccount = function () {
            return (typeof authService.user['dropboxUid'] != 'undefined')
                && (authService.user['dropboxUid'] != null)
                && (authService.user['dropboxUid'] != "");
        };

        $scope.hasGDriveAccount = function () {
            return (typeof authService.user['googleEmail'] != 'undefined')
                && (authService.user['googleEmail'] != null)
                && (authService.user['googleEmail'] != "");
        };

        $scope.processGDrive = function () {
            console.log("processDropbox");
            if ( $scope.hasGDriveAccount()) {
                deleteGDrive();
            } else {
                addGDrive();
            }
        };

        $scope.processDropbox = function () {
            console.log("processDropbox");
            if ( $scope.hasDropboxAccount()) {
                deleteDropbox();
            } else {
                addDropbox();
            }
        };

        function addGDrive () {
            authService.gdriveAddingURL().then((function (data) {
                console.log("addGDrive : " + data);
                window.location.href = data;
            }));
        }

        function deleteGDrive() {
            console.log("delete gdrive acc");
            authService.gdriveDelete().then((function (data) {
                window.location.href = "/";
            }));
        }


        function addDropbox() {
            authService.dropboxAddingURL().then((function (data) {
                console.log("loginWithDropbox : " + data);
                window.location.href = data;
            }));
        }

        function deleteDropbox() {
            console.log("delete dropbox acc");
            authService.dropboxDelete().then((function (data) {
                window.location.href = "/";
            }));
        }


    }]);
