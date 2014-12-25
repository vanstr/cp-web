'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.utilsService
 * @description
 * # utilsService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
    .service('utilsService', function() {
        return {
            createLightSongObject: function(song) {
                var songData = new Object();
                songData.fileId = song.fileId;
                songData.cloudId = song.cloudId;
                songData.fileName = song.fileName;
                return songData;
            }
        };
    });