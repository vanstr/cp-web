'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.player
 * @description
 * # player
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('Player', function player($q, $http) {
            var playList;


            var listAllSongs = function() {
                var deferred = $q.defer();

                $http.get('/api/api/getPlayList ').success(function (data) {
                    deferred.resolve(data);
                    playList = data
                }).error();

                return deferred.promise;
            };

            return {
                listAllSongs: listAllSongs
            }
        });
