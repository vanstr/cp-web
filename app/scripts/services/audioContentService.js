'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioContentService
 * @description
 * # audioContentService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioContentService', ['$log', '$q', '$http', function ($log, $q, $http) {

            var self = this;

            self.currentPlayList = null;
            self.allSongs = null;
            self.playLists = null;

            self.getAllSongsFromCashe = function () {
                $log.debug("getAllSongsFromCashe:");
                if (self.allSongs !== null) {
                    var deferred = $q.defer();
                    deferred.resolve(self.allSongs);
                    return deferred.promise;
                }
                else {
                    return self.getAllSongs();
                }
            };

            //  TODO in cp-core better rename getPlayList to getAllSongs
            self.getAllSongs = function () {
                $log.debug("getAllSongs:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/playList';
                $http.get(apiUrl).success(function (data) {
                    $log.debug(data);
                    self.allSongs = data;
                    deferred.resolve(data);
                }).error();
                return deferred.promise;
            };


            self.getFileSrc = function (cloudId, fileId) {
                $log.debug("getFileSrc:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/link?cloudId=' + cloudId + '&fileId=' + fileId;
                $http.get(apiUrl).success(function (song) {
                    $log.debug(song);
                    deferred.resolve(song);
                }).error(error);
                return deferred.promise;
            };

            self.getPlayListById = function (playListId) {
                $log.debug("getPlayListById:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/playList/' + playListId;
                $http.get(apiUrl).success(function (data) {
                    $log.debug(data);
                    deferred.resolve(data);
                }).error();
                return deferred.promise;
            };

            self.getPlayLists = function () {
                $log.debug("getPlayLists:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/playLists';
                $http.get(apiUrl).success(function (data) {
                    $log.debug(data);
                    self.playLists = data;
                    deferred.resolve(data);
                }).error();
                return deferred.promise;
            };


            self.deletePlayList = function (playListId) {
                $log.debug("deletePlayList:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/playList/' + playListId;
                $http.delete(apiUrl).success(function (data) {
                    $log.debug(data);
                    deferred.resolve(data);
                }).error();
                return deferred.promise;
            };

            self.getSongMetadataFromFile = function (songObj) {
                $log.debug("requestSongMetadata" + songObj.url);
                var deferred = $q.defer();
                var songUrl = songObj.url; // TODO asume that url is avalable for all songs
                ID3.loadTags(songUrl, function () {
                    var metadata = ID3.getAllTags(songUrl);
                    $log.debug("metadata: ");
                    $log.debug(metadata);
                    deferred.resolve(metadata);
                });
                return deferred.promise;
            };

            // TODO test
            self.saveSongMetadata = function (song) {
                $log.debug("saveSongMetadata:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/saveSongMetadata';
                $http({
                    url: apiUrl,
                    method: "POST",
                    data: JSON.stringify(song),
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    $log.debug(data);
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };

            // TODO test
            self.addPlayList = function (playList) {
                $log.debug("addPlayList:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/playList';
                $http({
                    url: apiUrl,
                    method: "POST",
                    data: JSON.stringify(playList),
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    $log.debug(data);
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };

            self.getPlayLists = function () {
                var deferred = $q.defer();
                $http.get('/api/api/playLists').success(function (playLists) {
                    deferred.resolve(playLists);
                }).error();

                return deferred.promise;
            };



            // get allSongs when service is initialized
            self.getAllSongs();

        }]);