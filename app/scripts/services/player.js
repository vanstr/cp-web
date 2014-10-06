'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.player
 * @description
 * # player
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('Player', function player(content, $q, $http) {
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

            return {
                getAllSongs: getAllSongs
            }
        });
