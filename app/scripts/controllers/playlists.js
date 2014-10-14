'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayListsCtrl
 * @description
 * # PlayListsCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('PlayListsCtrl', ['$scope', 'Player', function ($scope, Player) {

        var playLists = PlayLists.getPlayLists();
        console.log(playLists);

    }]);
