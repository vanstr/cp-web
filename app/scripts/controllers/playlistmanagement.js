angular.module('cpWebApp')
    .controller('PlayListManagementCtrl',
    ['$rootScope', '$scope', 'audioContentService', '$routeParams', '$modal', '$location', 'audioPlayer',
        function ($rootScope, $scope, audioContentService, $routeParams, $modal, $location, audioPlayer) {

            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            $scope.styles = new Array();
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
                audioContentService.addSongToPlayList($routeParams.playListId, song).then(function(data){
                    if($scope.updatedPlaylist.songs.indexOf(song) < 0){
                        $scope.updatedPlaylist.songs.push(song);
                    }
                });
            };

            $scope.readyUpdatePlayList = function(){
                $location.path("/playList/" + $routeParams.playListId);
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

        }]);