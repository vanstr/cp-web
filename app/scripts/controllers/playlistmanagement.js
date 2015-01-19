angular.module('cpWebApp')
    .controller('PlayListManagementCtrl', function ($rootScope, $scope, audioContentService, $routeParams, $modal, $location, audioPlayer) {

            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            $scope.styles = new Array();
            $scope.songsToAdd = new Array();

            $scope.removeFromPlayList = function(song){
                $scope.songsToAdd.splice($scope.songsToAdd.indexOf(song), 1);
            };

            $scope.addSongToPlayList = function(song){
                $scope.songsToAdd.push(song);
            };

            $scope.readyUpdatePlayList = function(){
                audioContentService.addSongsToPlayList($routeParams.playListId,
                    $scope.songsToAdd).then(function(){
                        audioPlayer.currentPlayList.songs = audioPlayer.currentPlayList.songs.concat($scope.songsToAdd);
                        $location.path("/playList/" + $routeParams.playListId);
                    });
            };

            $scope.isPlaying = function (song) {
                return audioPlayer.isPlaying() && $scope.isSelected(song);
            };

            $scope.isSelected = function (song) {
                // TODO could be optimized, lighter comparing
                return angular.equals(audioPlayer.getCurrentSong(), song)
                    && $scope.playlist.id == audioPlayer.currentPlayList.id
                    && angular.equals($scope.playlist, audioPlayer.currentPlayList);
            };

            $scope.play = function (song) {
                audioPlayer.currentPlayList = $scope.playlist;
                audioPlayer.setCurrentSong(song);
                audioPlayer.setPlaying(true);
            };

            $scope.pause = function () {
                audioPlayer.setPlaying(false);
            };

        });