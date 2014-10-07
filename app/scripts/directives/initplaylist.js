'use strict';

/**
 * @ngdoc directive
 * @name cpWebApp.directive:initPlaylist
 * @description
 * # initPlaylist
 */
angular.module('cpWebApp')
        .directive('initPlaylist', function () {
            return {
                template: '<div></div>',
                restrict: 'E',
                scope: {
                    playlist: '=',
                },
                link: function postLink(scope, element, attrs) {
                    console.log(scope.playlist)


                    var myPlaylist = new jPlayerPlaylist({
                        jPlayer: "#jplayer_N",
                        cssSelectorAncestor: "#jp_container_N"
                    }, [
                        {
                            title: "My Busted Chump",
                            artist: "Russ",
                            mp3: "http://stream.get-tune.net/listen/245221177/151659966/3566101381/fc234984ecd9da3a/Rodion_Gazmanov_-_Gravitaciya_(get-tune.net).mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Sad but true",
                            artist: "Metallica",
                            mp3: "http://stream.get-tune.net/listen/93104458/112783764/3566101381/fc234984ecd9da3a/Metalika_-_sda_but_true_(get-tune.net).mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Cloudless Days",
                            artist: "ADG3 Studios",
                            mp3: "http://flatfull.com/themes/assets/musics/adg3com_cloudlessdays.mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Core Issues",
                            artist: "Studios",
                            mp3: "http://flatfull.com/themes/assets/musics/adg3com_coreissues.mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Cryptic Psyche",
                            artist: "ADG3",
                            mp3: "http://flatfull.com/themes/assets/musics/adg3com_crypticpsyche.mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Electro Freak",
                            artist: "Studios",
                            mp3: "http://flatfull.com/themes/assets/musics/adg3com_electrofreak.mp3",
                            poster: "images/m0.jpg"
                        },
                        {
                            title: "Freeform",
                            artist: "ADG",
                            mp3: "http://flatfull.com/themes/assets/musics/adg3com_freeform.mp3",
                            poster: "images/m0.jpg"
                        }
                    ], {
                        playlistOptions: {
                            enableRemoveControls: true,
                            autoPlay: true
                        },
                        swfPath: "js/jPlayer",
                        supplied: "webmv, ogv, m4v, oga, mp3",
                        smoothPlayBar: true,
                        keyEnabled: true,
                        audioFullScreen: false
                    });

                    $(document).on($.jPlayer.event.pause, myPlaylist.cssSelector.jPlayer, function () {
                        $('.musicbar').removeClass('animate');
                        $('.jp-play-me').removeClass('active');
                        $('.jp-play-me').parent('li').removeClass('active');
                    });

                    $(document).on($.jPlayer.event.play, myPlaylist.cssSelector.jPlayer, function () {
                        $('.musicbar').addClass('animate');
                    });

                    $(document).on('click', '.jp-play-me', function (e) {
                        e && e.preventDefault();
                        var $this = $(e.target);
                        if (!$this.is('a')) {
                            $this = $this.closest('a');
                        }

                        $('.jp-play-me').not($this).removeClass('active');
                        $('.jp-play-me').parent('li').not($this.parent('li')).removeClass('active');

                        $this.toggleClass('active');
                        $this.parent('li').toggleClass('active');
                        if (!$this.hasClass('active')) {
                            myPlaylist.pause();
                        }
                        else {
                            var i = Math.floor(Math.random() * (1 + 7 - 1));
                            myPlaylist.play(i);
                        }
                    });

                }
            };
        });
