'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
        .controller('PlayerCtrl', ['$scope', '$q', 'audioContentService', 'audioPlayer', function ($scope, $q, audioContentService, audioPlayer) {

            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            console.log(audioContentService.allSongs);

            audioPlayer.currentPlayList = audioContentService.allSongs;
            audioPlayer.currentSong = audioPlayer.getCurrentSong();
            audioPlayer.currentSongArtist = "Unknown";

            $scope.isPlaying = function (song) {
                return audioPlayer.isPlaying() && $scope.isSelected(song);
            };

            $scope.isSelected = function (song) {
                // TODO could be optimized, lighter comparing
                return angular.equals(audioPlayer.getCurrentSong(), song);
            };

            $scope.play = function (song) {
                audioPlayer.setCurrentSong(song);
                audioPlayer.setPlaying(true);

                setSongArtist( audioPlayer.getCurrentSong());
            };

            $scope.pause = function () {
                audioPlayer.setPlaying(false);
            };

            // Metadata

            function getSongMetadata(song) {
                var promise = null;
                if (song.metadata == null || song.metadata.length == 0) {
                    promise  = audioContentService.getSongMetadataFromFile(song);
                    promise.then(function(data){
                        song.metadata = data;
                        audioContentService.saveSongMetadata(song);
                    });
                }
                else {
                    var deferred = $q.defer();
                    deferred.resolve(song.metadata);
                    promise = deferred.promise;
                }
                return promise;
            };

            function setSongArtist(song) {
                getSongMetadata(song).then(function(metadata){
                    var artist = "Unknown";
                    console.log("Song artist:" + metadata.artist);
                    if(metadata.artist != null && metadata.artist.length > 0 ){
                        artist = metadata.artist;
                    }
                    $scope.currentSongArtist = artist;
                    return artist;
                })

            };
            $scope.getSongAlbum = function (song) {
                // TODO could be optimized, lighter comparing
                return angular.equals(audioPlayer.getCurrentSong(), song);
            };

        }]);
