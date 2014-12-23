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

            audioContentService.getAllSongs();
            audioPlayer.currentSong = null;
            audioPlayer.currentPlayList = null;
            $scope.playlist = null;
            $scope.currentSong = null;
            audioPlayer.currentSongArtist = "Unknown";

            // Set default playlist
            // trigger if allSongs or changed, then refresh view content
            $scope.$watch(
                    function () {
                        return audioContentService.allSongs
                    },
                    function (newVal, oldVal) {
                        if (typeof newVal !== 'undefined') {
                            $scope.playlist = audioContentService.allSongs;
                            audioPlayer.currentPlayList = audioContentService.allSongs;
                        }
                    }
            );

            // trigger currentSong changing and
            $scope.$watch(
                    function () {
                        return audioPlayer.getCurrentSong();
                    },
                    function (newVal, oldVal) {
                        if ( newVal != null && newVal != oldVal) {
                            $scope.currentSong = newVal;
                        }
                    }
            );

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

        }]);
