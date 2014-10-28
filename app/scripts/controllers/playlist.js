'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayListCtrl
 * @description
 * # PlayListCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('PlayListCtrl', ['$rootScope', '$scope', 'audioContentService', '$routeParams', '$modal', '$location',
        function ($rootScope, $scope, audioContentService, $routeParams, $modal, $location) {

            $scope.styles = new Array();
            $scope.open = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'views/playListPopUp.html',
                    controller: 'ModalInstanceCtrl'
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.newPlayList["name"] = selectedItem;
                });
            };

            $scope.ok = function () {
                $modalInstance.close($scope.newPlayList.name);
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            $scope.addEntry = function(song) {
                var songObject = new Object();
                songObject.fileId = song.fileId;
                songObject.cloudId = song.cloudId;
                songObject.fileName = song.fileName;
                var isPresent = false;
                for(var obj in $scope.newPlayList.songs){
                    if($scope.newPlayList.songs[obj].fileId == songObject.fileId
                           && $scope.newPlayList.songs[obj].cloudId == songObject.cloudId){
                        isPresent = true;
                        break;
                    }
                }
                if(!isPresent){
                    $scope.newPlayList.songs.push(songObject);
                    console.log($scope.newPlayList.songs);
                }
            };

            $scope.removeEntry = function(song) {
                for(var obj in $scope.newPlayList.songs){
                    if($scope.newPlayList.songs[obj].fileId == song.fileId
                            && $scope.newPlayList.songs[obj].cloudId == song.cloudId){
                        $scope.newPlayList.songs.splice(obj, 1);
                        console.log($scope.newPlayList.songs);
                        break;
                    }
                }
            };

            $scope.deletePlayList = function(playListId){
                audioContentService.deletePlayList(playListId).then(function (){
                    $rootScope.$broadcast('deletedPlayList', playListId);
                    $location.path("/player");
                });
            };

            $scope.ready = function(){
                audioContentService.addPlayList($scope.newPlayList).then(function (newPlayListId){
                    $scope.newPlayList.id = newPlayListId;
                    $rootScope.$broadcast('addedPlayList', $scope.newPlayList);
                    $location.path("/playList/" + newPlayListId);
                });
            };

            $scope.hasPlayList = function(){
                if($routeParams.id){
                    return true;
                }
                return false;
            };

            $scope.removeFromPlayList = function(song){
                var id = $routeParams.id;
                audioContentService.removeSongFromPlayList(id, song).then(function(data){
                    console.log($scope.playlist);
                    console.log($scope.playlist.songs.indexOf(song));
                    $scope.playlist.songs.splice($scope.playlist.songs.indexOf(song), 1);
                });
            };

            if($routeParams.id) {
                audioContentService.getPlayListById($routeParams.id).then(function (playlist) {
                    $scope.playlist = playlist;
                });
            } else {
                //TODO parallel
                $scope.audioContentService = audioContentService;
                $scope.playlist = audioContentService.allSongs;
                $scope.newPlayList = new Object();
                $scope.newPlayList.id = null;
                $scope.newPlayList.songs = new Array();
                $scope.open();
            }

        }]);

angular.module('cpWebApp').controller('ModalInstanceCtrl',['$scope', '$modalInstance', '$location',
    function ($scope, $modalInstance, $location) {

        $scope.ok = function () {
            $modalInstance.close($scope.newPlayList.name);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
            $location.path("/player");
        };
}]);

angular.module('cpWebApp')
    .controller('PlayListManagementCtrl', ['$rootScope', '$scope', 'audioContentService', '$routeParams', '$modal', '$location',
        function ($rootScope, $scope, audioContentService, $routeParams, $modal, $location) {

            $scope.styles = new Array();
            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            audioContentService.getPlayListById($routeParams.playListId).then(function (playlist) {
                $scope.updatedPlaylist = playlist;
            });

            $scope.removeFromPlayList = function(song){
                var id = $routeParams.playListId;
                audioContentService.removeSongFromPlayList(id, song).then(function(data){
                    console.log($scope.playlist);
                    console.log($scope.playlist.songs.indexOf(song));
                    $scope.updatedPlaylist.songs.splice($scope.updatedPlaylist.songs.indexOf(song), 1);
                });
            };

            $scope.addSongToPlayList = function(song){
                console.log("id = " + $routeParams.playListId);
                console.log("song = ");
                console.log(song);
                audioContentService.addSongToPlayList($routeParams.playListId, song).then(function(data){
                    if($scope.updatedPlaylist.songs.indexOf(song) < 0){
                        $scope.updatedPlaylist.songs.push(song);
                    }
                });
            };

            $scope.readyUpdatePlayList = function(){
                $location.path("/playList/" + $routeParams.playListId);
            };

        }]);