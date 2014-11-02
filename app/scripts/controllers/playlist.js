'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayListCtrl
 * @description
 * # PlayListCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('PlayListCtrl',
        ['$rootScope', '$scope', 'audioContentService', '$routeParams', '$modal', '$location', 'audioPlayer',
        function ($rootScope, $scope, audioContentService, $routeParams, $modal, $location, audioPlayer) {

            $scope.styles = new Array();
            $scope.open = function () {

                var modalInstance = $modal.open({
                    templateUrl: 'playListPopUp.html',
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
                var songData = createLightSongObject(song, null);
                var isPresent = false;
                for(var obj in $scope.newPlayList.songs){
                    if($scope.newPlayList.songs[obj].fileId == songData.fileId
                           && $scope.newPlayList.songs[obj].cloudId == songData.cloudId){
                        isPresent = true;
                        break;
                    }
                }
                if(!isPresent){
                    $scope.newPlayList.songs.push(songData);
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
                    $scope.playlist = null;
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
                    audioPlayer.currentPlayList = $scope.playlist;
                    if(angular.equals(audioPlayer.getCurrentSong(), song)){
                        audioPlayer.clear();
                    }
                });
            };

            $scope.isPlaying = function (song) {
                return audioPlayer.isPlaying() && $scope.isSelected(song);
            };

            $scope.isSelected = function (song) {
                // TODO could be optimized, lighter comparing
                return angular.equals(audioPlayer.getCurrentSong(), song)
                    && $scope.playlist.id == audioPlayer.currentPlayList.id;
            };

            $scope.play = function (song) {
                audioPlayer.currentPlayList = $scope.playlist;
                audioPlayer.setCurrentSong(song);
                audioPlayer.setPlaying(true);
            };

            $scope.pause = function () {
                audioPlayer.setPlaying(false);
            };

            if($routeParams.id) {
                audioContentService.getPlayListById($routeParams.id).then(function (playlist) {
                    $scope.playlist = jQuery.extend(true, {}, playlist);
                    $scope.playlist.songs = [];
                    audioContentService.getAllSongsFromCache().then(function (allSongs){
                        for(var j = 0; j < playlist.songs.length; j++){
                            if(!playlist.songs[j].url) {
                                for (var i = 0; i < allSongs.songs.length; i++) {
                                    if (allSongs.songs[i]["fileId"] == playlist.songs[j]["fileId"]
                                        && allSongs.songs[i]["cloudId"] == playlist.songs[j]["cloudId"]) {

                                        $scope.playlist.songs.push(allSongs.songs[i]);
                                        break;
                                    }
                                }
                            }
                        }
                        if(!audioPlayer.currentPlayList) {
                            audioPlayer.currentPlayList = $scope.playlist;
                            audioPlayer.setCurrentSong(audioPlayer.getCurrentSong());
                        }
                    });
                });
            } else {
                //TODO parallel
                $scope.open();
                $scope.audioContentService = audioContentService;
                $scope.playlist = audioContentService.allSongs;
                $scope.newPlayList = new Object();
                $scope.newPlayList.id = null;
                $scope.newPlayList.songs = new Array();
                audioPlayer.currentPlayList = audioContentService.allSongs;
            }

        }]);