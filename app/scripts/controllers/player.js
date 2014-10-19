'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
        .controller('PlayerCtrl', ['$scope', 'audioContentService', 'audioPlayer', function ($scope, audioContentService, audioPlayer) {

            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            console.log(audioContentService.allSongs);

            audioPlayer.currentPlayList = audioContentService.allSongs;

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
            };

            $scope.pause = function () {
                audioPlayer.setPlaying(false);
            };

        }]);
