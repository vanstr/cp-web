'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioContentService
 * @description
 * # audioContentService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioContentService', ['$log', '$q', '$http', 'utilsService', function ($log, $q, $http, utilsService) {

            var self = this;

            self.currentPlayList = null;
            self.allSongs = null;
            self.playLists = null;

            //TODO rename
            self.getAllSongsFromCache = function () {
                $log.debug("getAllSongsFromCache:");
                if (self.allSongs !== null) {
                    var deferred = $q.defer();
                    deferred.resolve(self.allSongs);
                    return deferred.promise;
                }else {
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
                var deferred = $q.defer();
                var apiUrl = '/api/api/playLists';
                $http.get(apiUrl).success(function (data) {
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

            // TODO test
            self.saveSongMetadata = function (songMetadata) {
                $log.debug("saveSongMetadata:");
                var deferred = $q.defer();
                var apiUrl = '/api/api/saveSongMetadata';
                $http({
                    url: apiUrl,
                    method: "POST",
                    data: JSON.stringify(songMetadata),
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
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };

            self.getPlayLists = function() {
                $log.debug("getPlayLists:");
                var deferred = $q.defer();
                $http.get('/api/api/playLists').success(function (playLists){
                    $log.debug(data);
                    deferred.resolve(playLists);
                }).error();

                return deferred.promise;
            };

            self.addSongsToPlayList = function(playListId, songs){
                var deferred = $q.defer();
                var songsToAdd = new Object();
                songsToAdd.playListId = playListId;
                songsToAdd.songs = new Array();
                for(var song in songs) {
                    songsToAdd.songs.push(utilsService.createLightSongObject(songs[song]));
                }
                $http({
                    url: '/api/api/playListSong',
                    method: "POST",
                    data: JSON.stringify(songsToAdd),
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };

            self.removeSongFromPlayList = function(playListId, song){
                var deferred = $q.defer();
                var songData = utilsService.createLightSongObject(song);
                songData.playListId = playListId;
                $http({
                    url: '/api/api/playListSong',
                    method: "DELETE",
                    data: JSON.stringify(songData),
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };


        }]);