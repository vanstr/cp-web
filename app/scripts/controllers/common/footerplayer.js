'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:FooterPlayerCtrl
 * @description
 * # CommonFooterplayerCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
        .controller('FooterPlayerCtrl', [ '$scope','audioPlayer', function ($scope, audioPlayer) {
            $scope.myVar = "test";
            $scope.audioPlayer = audioPlayer;

        }]);
