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
                if (self.currentPlayList) {
                    var length = self.currentPlayList.length;
                    for (var i = 0; i < length; i++) {
                        var s = self.currentPlayList[i];
                        if (angular.equals(s, song)) {
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
                    // create new playlist of 1 song
                    self.originalPlayList = [song];
                    self.currentPlayList = [song];
                    currentSongN = 0;
                }
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
                var plLength = self.currentPlayList.length;
                console.log("PlLength: " + plLength);

                var nextSongNumber = self.currentNumber + 1;
                if (nextSongNumber >= plLength) {
                    console.log("it is last song of playlist or incorrect value, select first");
                    nextSongNumber = 0;
                }

                currentSong = self.currentPlayList[nextSongNumber];
                currentSongN = nextSongNumber;
                playing = autoPlay;
                playerState++;
            };

            // TODO self.prev


            return self;

        });
