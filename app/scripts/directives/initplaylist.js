'use strict';

/**
 * @ngdoc directive
 * @name cpWebApp.directive:initPlaylist
 * @description
 * # initPlaylist
 */
angular.module('cpWebApp')
        .directive('initPlaylist', ['audioPlayer', function (audioPlayer) {
            return {
                template: '<div></div>',
                restrict: 'E',
                scope: {
                    song: '='
                },
                link: function postLink(scope, element, attrs) {
                    console.log("link");
                    console.log(scope.song);
                    var playerDom = $("#jplayer_N");

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
                        playerDom.jPlayer("clearMedia");
                        setSongToJPlayer(audioPlayer.getCurrentSong());

                        if( audioPlayer.isPlaying() ){
                            playerDom.jPlayer("play");
                        }else{
                            playerDom.jPlayer("pause");
                        }
                    }

                    function setSongToJPlayer(song) {
                        playerDom.jPlayer("setMedia", {
                            "mp3": song.url, //TODO
                            "title":song.title
                        });
                    }

                    initJPlayer();

//                    updateJPlayer(scope.song);
                    scope.$watch('song', function (newValue, oldValue) {
                        console.log("Check song o: " + oldValue + " n: " + newValue);
                        if (newValue != oldValue) {
                            console.log("action");
                            updateJPlayer();
                        }
                    }, true)


                }
            };
        }]);
