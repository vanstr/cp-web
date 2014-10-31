'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayListsCtrl
 * @description
 * # PlayListsCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('PlayListsCtrl', ['$rootScope', '$scope', 'audioContentService', 'authService',
        function ($rootScope, $scope, audioContentService, authService) {

            if (authService.isLoggedIn()) {
                audioContentService.getPlayLists().then(function(playLists){
                    $scope.playLists = playLists;
                });
            }

            $rootScope.$on('login', function(event, args) {
                audioContentService.getPlayLists().then(function(playLists){
                    $scope.playLists = playLists;
                });
            });

            $scope.$on('addedPlayList', function(event, playList) {
                $scope.playLists.push(playList);
            });

            $scope.$on('deletedPlayList', function(event, playListId) {
                for(var current in $scope.playLists){
                    if($scope.playLists[current].id == playListId){
                        $scope.playLists.splice(current, 1);
                        break;
                    }
                }
            });
    }]);
