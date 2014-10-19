'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:FooterPlayerCtrl
 * @description
 * This controller pass variable audioPlayer.playerState to initJplayer directive which trigger changes from it
 */
angular.module('cpWebApp')
        .controller('FooterPlayerCtrl', [ '$scope','audioPlayer', function ($scope, audioPlayer) {
            $scope.audioPlayer = audioPlayer;
        }]);
