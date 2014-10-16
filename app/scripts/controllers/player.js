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

            audioContentService.getAllSongs().then(function(pl) {
                console.log(pl);
                $scope.playlist = pl;
            });

        }]);
