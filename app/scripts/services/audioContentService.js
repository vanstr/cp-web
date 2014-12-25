'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioContentService
 * @description
 * # audioContentService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioContentService',  function ($log, $q, $http, utilsService) {

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
                var apiUrl = '/api/playList';
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
                var apiUrl = '/api/link?cloudId=' + cloudId + '&fileId=' + fileId;
                $http.get(apiUrl).success(function (song) {
                    $log.debug(song);
                    deferred.resolve(song);
                }).error(error);
                return deferred.promise;
            };

            self.getPlayListById = function (playListId) {
                $log.debug("getPlayListById:");
                var deferred = $q.defer();
                var apiUrl = '/api/playList/' + playListId;
                $http.get(apiUrl).success(function (data) {
                    $log.debug(data);
                    deferred.resolve(data);
                }).error();
                return deferred.promise;
            };

            self.getPlayLists = function () {
                $log.debug("getPlayLists:");
                var deferred = $q.defer();
                var apiUrl = '/api/playLists';
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
                var apiUrl = '/api/playList/' + playListId;
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
                var apiUrl = '/api/saveSongMetadata';
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
                var apiUrl = '/api/playList';
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

            self.addSongsToPlayList = function(playListId, songs){
                var deferred = $q.defer();
                var songsToAdd = new Object();
                songsToAdd.playListId = playListId;
                songsToAdd.songs = new Array();
                for(var song in songs) {
                    songsToAdd.songs.push(utilsService.createLightSongObject(songs[song]));
                }
                $http({
                    url: '/api/playListSong',
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
                    url: '/api/playListSong',
                    method: "DELETE",
                    data: JSON.stringify(songData),
                    headers: {'Content-Type': 'application/json'}
                }).success(function (data) {
                    deferred.resolve(data);
                }).error();

                return deferred.promise;
            };


        });