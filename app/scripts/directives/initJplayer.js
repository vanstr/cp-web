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

                    var playerDom = $("#jplayer_N");
                    var song = null;

                    function initJPlayer() {
                        playerDom.jPlayer("destroy");
                        playerDom.jPlayer({
                            ready: function (event) {
                                console.log("JPlayer initialized");
                            },
                            ended: function () {
                                //TODO self.next(); self.play();
                            },
                            cssSelectorAncestor: "#jp_container_N",
                            supplied: "mp3"
                        });
                    }
                    function updateJPlayer() {

                        if( !angular.equals(song, audioPlayer.getCurrentSong()) ){
                            setSongToJPlayer(audioPlayer.getCurrentSong());
                        }

                        if( audioPlayer.isPlaying() ){
                            playerDom.jPlayer("play");
                        }else{
                            playerDom.jPlayer("pause");
                        }
                        console.log("isPlaying:" +  audioPlayer.isPlaying());
                    }

                    function setSongToJPlayer(newSong) {
                        console.log("setSongToJPlayer");
                        playerDom.jPlayer("clearMedia");
                        song = newSong;
                        playerDom.jPlayer("setMedia", {
                            "mp3": song.url, //TODO
                            "title":song.fileName
                        });
                    }

                    initJPlayer();

                    scope.$watch('state', function (newValue, oldValue) {
                        console.log("Check song o: " + oldValue + " n: " + newValue);
                        if (newValue != oldValue) {
                            console.log("action");
                            updateJPlayer();
                        }
                    }, true)


                }
            };
        }]);
