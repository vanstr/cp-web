'use strict';

/**
 * @ngdoc function
 * @name cpWebApp.controller:PlayListsCtrl
 * @description
 * # PlayListsCtrl
 * Controller of the cpWebApp
 */
angular.module('cpWebApp')
    .controller('PlayListsCtrl', ['$scope', 'audioContentService', function ($scope, audioContentService) {

        audioContentService.getPlayLists().then(function(playLists){
            $scope.playLists = playLists;
        });

    }]);
