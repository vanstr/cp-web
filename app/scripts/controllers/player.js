'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayerCtrl
 * @description
 * # PlayerCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
        .controller('PlayerCtrl', ['$scope', 'Player', function ($scope, Player) {

            Player.getAllSongs().then(function(pl) {
                console.log(pl);
                $scope.playlist = pl;
            });

        }]);
