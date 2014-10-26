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

            audioPlayer.currentSong = null;
            audioPlayer.currentPlayList = null;
            $scope.playlist = null;
            audioPlayer.currentSongArtist = "Unknown";

            // Set default playlist
            // if allSongs or updated refresh view content
            $scope.$watch(
                    function () {
                        return audioContentService.allSongs
                    },
                    function (newVal, oldVal) {
                        if (typeof newVal !== 'undefined') {
                            $scope.playlist = audioContentService.allSongs;
                            audioPlayer.currentPlayList = audioContentService.allSongs;
                            audioPlayer.currentSong = audioPlayer.getCurrentSong();
                        }
                    }
            );

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

            // TODO move to service
            function getSongMetadata(song) {
                var promise = null;
                console.log("song.metadata: ");
                console.log(song);
                if (song.metadata == null || song.metadata.length == 0) {
                    promise  = audioContentService.getSongMetadataFromFile(song);
                    console.log("metadata gotted");
                    promise.then(function(data){
                        console.log("audioContentService: " + audioContentService);
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
