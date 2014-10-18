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

            $scope.isPlaying = function (song) {
                // TODO could be optimized, lighter comparing
                if (angular.equals(audioPlayer.getCurrentSong(), song)) {
                    return true;
                }
                return false;

            }

            $scope.play = function (song) {
                audioPlayer.setCurrentSong(song);
                audioPlayer.setPlaying(true);
            };

            $scope.pause = function () {
                audioPlayer.setPlaying(false);
            };

        }]);
