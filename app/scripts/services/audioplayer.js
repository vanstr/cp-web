'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioPlayer
 * @description
 * # audioPlayer
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioPlayer', [ 'audioContentService', function audioPlayer(audioContentService) {

            var self = this;

            // Played song obj
            var currentSong = null;
            // Played song reference in currentPlayList
            var currentSongN = 0;

            var playing = false;

            // After each action state value increases,
            // initJplayer triggers changes by this value
            var playerState = 1;

            self.originalPlayList = null;

            self.currentPlayList = null;

            self.getPlayerState = function(){
                return playerState;
            };

            self.setCurrentSong = function (song) {
                // search song in current playlist
                var foundSongIndex = -1;
                if (self.currentPlayList && self.currentPlayList.songs) {
                    var length = self.currentPlayList.songs.length;
                    for (var i = 0; i < length; i++) {
                        var s = self.currentPlayList.songs[i];
                        if (angular.equals(s, song)) {
                            console.log("Song found");
                            foundSongIndex = i;
                            break;
                        }
                    }
                }

                currentSong = song;
                if (foundSongIndex > -1) {
                    currentSongN = foundSongIndex;
                }
                else {
                    console.log("Song not found in playlist");
                    // create new playlist of 1 song
                    self.originalPlayList = { "songs" :[song], "id": 0, "name": "unnamed"};
                    self.currentPlayList = { "songs" :[song], "id": 0, "name": "unnamed"};
                    currentSongN = 0;
                }

                fetchSongMetadata(song);

                playerState++;
            };

            self.getCurrentSong = function () {
                return currentSong;
            };

            self.getCurrentSongN = function () {
                return currentSongN;
            };
            self.setCurrentSongN = function (index) {
                currentSong = self.currentPlayList.songs[index];
                currentSongN = index;
                fetchSongMetadata(currentSong);

                playerState++;
            };


            self.playPause = function () {
                console.log("start playing");
                playing = !playing;
                playerState++;
            };
            self.setPlaying = function (play) {
                playing = play;
                playerState++;
            };
            self.isPlaying = function () {
                return playing;
            };


            self.next = function (autoPlay) {
                var plLength = self.currentPlayList.songs.length;
                console.log("PlLength: " + plLength);

                var nextSongNumber = currentSongN + 1;
                if (nextSongNumber >= plLength) {
                    console.log("it is last song of playlist or incorrect value, select first");
                    nextSongNumber = 0;
                }

                self.setCurrentSongN(nextSongNumber);

                self.setPlaying(autoPlay);
            };

            self.prev = function (autoPlay) {
                var plLength = self.currentPlayList.songs.length;
                console.log("PlLength: " + plLength);

                var prevSongNumber = currentSongN - 1;
                if (prevSongNumber < 0) {
                    console.log("it is first song of playlist or incorrect value, select last");
                    prevSongNumber = plLength -1;
                }

                self.setCurrentSongN(prevSongNumber);

                self.setPlaying(autoPlay);
            };

            function fetchSongMetadata(song) {
                if (song.metadata == null || song.metadata.length == 0) {
                    var promise  = audioContentService.getSongMetadataFromFile(song);
                    console.log("Got metadata");
                    promise.then(function(data){
                        song.metadata = data;
                        audioContentService.saveSongMetadata(song);
                    });
                }
            }

            return self;

        }]);
