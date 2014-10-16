'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
        .controller('PlayerCtrl', ['$scope', 'audioContentService', function ($scope, audioContentService) {
            $scope.audioContentService = audioContentService;
            $scope.playlist = audioContentService.allSongs;
            console.log(audioContentService.allSongs);

        }]);
