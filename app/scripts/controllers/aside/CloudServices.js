'use strict';


angular.module('cpWebApp')
    .controller('CloudServicesCtrl', ['$scope', 'authService', function ($scope, authService) {

        $scope.dropboxAction = hasDropboxAccount() ? "unlink" : "add";
        $scope.gdriveAction = hasGDriveAccount() ? "unlink" : "add";


        $scope.processDropbox = function () {
            console.log("processDropbox");
            if (hasDropboxAccount()) {
                deleteDropbox();
            } else {
                addDropbox();
            }

        };

        function addDropbox() {
            authService.dropboxAuthURL().then((function (data) {
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

        function hasDropboxAccount() {
            console.log("d ac: "+ authService.user['dropboxUid']);
            return (typeof authService.user['dropboxUid'] != 'undefined')
                && (authService.user['dropboxUid'] != null)
                && (authService.user['dropboxUid'] != "");
        }

        function hasGDriveAccount() {
            return (typeof authService.user['googleEmail'] != 'undefined')
                && (authService.user['googleEmail'] != null)
                && (authService.user['googleEmail'] != "");
        };


    }]);
