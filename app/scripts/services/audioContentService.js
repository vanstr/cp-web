'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioContentService
 * @description
 * # audioContentService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioContentService', ['$q', '$http', function audioContentService($q, $http) {

            var currentPlayList;
            var allSongs;
            var playLists;

//            getFileSrc
//            getPlayList
//            getPlayListById
//            saveSongMetadata
//            removeDrive
//            removeDropbox
//            addPlayList
//            getPlayLists
//            deletePlayList

            var getAllSongs = function () {
                var deferred = $q.defer();
                $http.get('/api/api/getPlayList ').success(function (data) {
                    deferred.resolve(data);
                    allSongs = data
                }).error();
                return deferred.promise;
            };

            return {
                getAllSongs: getAllSongs,
                currentPlayList: currentPlayList,
                allSongs: allSongs,
                playLists: playLists
            }
        }]);