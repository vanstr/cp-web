'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.Player
 * @description
 * # Player
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
    .service('Player', function player(content, $q, $http) {
        console.log("PLayer service");
        var playList;

        function savePlayList(data) {
            console.log(data);
            playList = data;
        }
        //content.listAllSongs(savePlayList);
        var getAllSongs = function() {
            var deferred = $q.defer();

            $http.get('/api/api/getPlayList ').success(function (playList) {
                deferred.resolve(playList);
                //savePlayList(playList);
            }).error();

            return deferred.promise;
        };

        var getPlayLists = function() {
            var deferred = $q.defer();
            $http.get('/api/api/getPlayLists').success(function (playLists){
                deferred.resolve(playLists);
            }).error();

            return deferred.promise;
        };

        return {
            getAllSongs: getAllSongs,
            getPlayLists : getPlayLists
        }
    });