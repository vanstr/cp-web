'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.audioPlayer
 * @description
 * # audioPlayer
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
        .service('audioPlayer', function audioPlayer() {

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
                currentSongN = foundSongIndex;
                playerState++;
            };

            self.getCurrentSong = function () {
                return currentSong;
            };

            self.getCurrentSongN = function () {
                return currentSongN;
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

                currentSong = self.currentPlayList.songs[nextSongNumber];
                currentSongN = nextSongNumber;

                self.setPlaying(autoPlay);
            };

            self.prev = function (autoPlay) {
                var plLength = self.currentPlayList.songs.length;
                console.log("PlLength: " + plLength);

                var nextSongNumber = currentSongN - 1;
                if (nextSongNumber < 0) {
                    console.log("it is first song of playlist or incorrect value, select last");
                    nextSongNumber = plLength -1;
                }

                currentSong = self.currentPlayList.songs[nextSongNumber];
                currentSongN = nextSongNumber;

                self.setPlaying(autoPlay);
            };

            self.clear = function(){
                self.currentSong = null;
                self.currentSongN = 0;
                self.setPlaying(false);
                self.setCurrentSong(null);
            }
            // TODO self.prev


            return self;

        });
