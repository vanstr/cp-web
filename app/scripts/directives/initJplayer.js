'use strict';

/**
 * @ngdoc directive
 * @name cpWebApp.directive:initPlaylist
 * @description
 * # initPlaylist
 */
angular.module('cpWebApp')
        .directive('initJplayer', ['audioPlayer', function (audioPlayer) {
            return {
                template: '<div></div>',
                restrict: 'E',
                scope: {
                    state: '='
                },
                link: function postLink(scope, element, attrs) {
                    var cssSelector = Object();
                    cssSelector.jplayer = "#jplayer_N";
                    cssSelector.ancestor = "#jp_container_N";
                    cssSelector.next = cssSelector.ancestor + " .jp-next";
                    cssSelector.previous = cssSelector.ancestor + " .jp-previous";

                    var playerDom = $(cssSelector.jplayer);

                    // song which is set in JPlayer
                    var song = null;

                    function initJPlayer() {
                        playerDom.jPlayer("destroy");
                        playerDom.jPlayer({
                            ready: function () {
                                console.log("JPlayer initialized");
                            },
                            play: function () {
                                audioPlayer.setPlaying(true);
                                scope.$apply();
                            },
                            pause: function () {
                                audioPlayer.setPlaying(false);
                                scope.$apply();
                            },
                            ended: function () {
                                audioPlayer.next(true);
                                scope.$apply();
                            },
                            cssSelectorAncestor: cssSelector.ancestor,
                            supplied: "mp3" // TODO
                        })

                        // Event listeners for Next & Prev
                        $(cssSelector.next).click(function (e) {
                            console.log("clicked next");
                            audioPlayer.next(true);
                            scope.$apply();
                        });
                        $(cssSelector.previous).click(function (e) {
                            audioPlayer.prev(true);
                            scope.$apply();
                        });
                    }

                    function updateJPlayer() {
                        console.log("updateJPlayer");
                        if (!angular.equals(song, audioPlayer.getCurrentSong())) {
                            setSongToJPlayer(audioPlayer.getCurrentSong());
                        }
                        var position = audioPlayer.currentPlayList.songs.indexOf(song)*60 - $(".scrollable.ng-scope").height();
                        if(audioPlayer.currentPlayList.songs.indexOf(song)*60 < $(".scrollable.ng-scope").scrollTop()){
                            $(".scrollable.ng-scope").scrollTop(audioPlayer.currentPlayList.songs.indexOf(song)*60);
                        } else if(position > 0
                            && audioPlayer.currentPlayList.songs.indexOf(song)*60 - $(".scrollable.ng-scope").scrollTop() > $(".scrollable.ng-scope").height()){
                            $(".scrollable.ng-scope").scrollTop(position + 60);
                        }
                        if (audioPlayer.isPlaying()) {
                            playerDom.jPlayer("play");
                        } else {
                            playerDom.jPlayer("pause");
                        }
                        console.log("isPlaying:" + audioPlayer.isPlaying());
                    }

                    function setSongToJPlayer(newSong) {
                        if(newSong) {
                            console.log("setSongToJPlayer: " + newSong.fileName);
                            playerDom.jPlayer("clearMedia");
                            song = newSong;
                            playerDom.jPlayer("setMedia", {
                                "mp3": song.url, //TODO
                                "title": song.fileName
                            });
                        } else {
                            playerDom.jPlayer("clearMedia");
                            $(".jp-title").text("");
                        }
                    }

                    initJPlayer();

                    // Trigger changes in audioPlayer, by `playerState` variable
                    scope.$watch('state', function (newValue, oldValue) {
                        console.log("Check state old: " + oldValue + " new: " + newValue);
                        if (newValue != oldValue) {
                            updateJPlayer();
                        }
                    }, true)


                }
            };
        }]);
