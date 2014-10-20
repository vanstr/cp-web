'use strict';

/**
 * @ngdoc overview
 * @name cpWebApp
 * @description
 * # cpWebApp
 *
 * Main module of the application.
 */
angular.module('cpWebApp',
        [
            'ngCookies',
            'ngResource',
            'ngRoute'
        ]).config(function ($httpProvider, $routeProvider) {
            var access = routingConfig.accessLevels;

            var getAllSongs = function (audioContentService) {
                console.log("wait for all songs");
                return audioContentService.getAllSongsFromCashe();
            }

            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        access: access.public
                    })
                    .when('/signin', {
                        templateUrl: 'views/signin.html',
                        controller: 'SigninCtrl',
                        access: access.anon
                    })
                    .when('/signup', {
                        templateUrl: 'views/signup.html',
                        controller: 'SignupCtrl',
                        access: access.anon
                    })
                    .when('/player', {
                        templateUrl: 'views/player.html',
                        controller: 'PlayerCtrl',
                        access: access.user,
                        resolve: {
                            data: getAllSongs
                        }
                    })
                    .when('/playLists', {
                        templateUrl: 'views/playlists.html',
                        controller: 'PlayListsCtrl',
                        access: access.user
                    })
                    .otherwise({
                        redirectTo: '/',
                        access: access.public
                    });

            var interceptor = ['$location', '$q', function ($location, $q) {
                function success(response) {
                    return response;
                }

                function error(response) {

                    if (response.status === 401) {
                        $location.path('/login');
                        return $q.reject(response);
                    }
                    else {
                        return $q.reject(response);
                    }
                }

                return function (promise) {
                    return promise.then(success, error);
                }
            }];

            $httpProvider.responseInterceptors.push(interceptor);
        })
        .run(['$rootScope', '$location', '$log', 'authService', function ($rootScope, $location, $log, authService) {

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $log.debug(next);
                $rootScope.error = null;
                if (!authService.authorize(next.access)) {
                    if (authService.isLoggedIn()) {
                        console.log("isLoggedIn");
                        $location.path('/');
                    }
                    else {
                        $location.path('/signin');
                    }
                }
            });

        }]);