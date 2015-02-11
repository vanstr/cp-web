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
            'ngRoute',
            'angular-growl',
            'ui.bootstrap'
        ]).config(function ($httpProvider, $routeProvider, growlProvider) {
            var access = routingConfig.accessLevels;

            $routeProvider
                    .when('/', {
                        templateUrl: 'views/main.html',
                        controller: 'MainCtrl',
                        access: access.anon
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
                        access: access.user
                    })
                    .when('/playList/:id', {
                        templateUrl: 'views/player.html',
                        controller: 'PlayListCtrl',
                        access: access.user
                    })
                    .when('/addPlayList', {
                        templateUrl: 'views/addPlayList.html',
                        controller: 'PlayListCtrl',
                        access: access.user
                    })
                    .when('/editPlayList/:playListId', {
                        templateUrl: 'views/editPlayList.html',
                        controller: 'PlayListManagementCtrl',
                        access: access.user
                    })
                    .when('/profile', {
                        templateUrl: 'views/profile.html',
                        controller: 'ProfileCtrl',
                        access: access.user
                    })
                    .when('/logout', {
                      template: ' ',
                      controller: 'LogoutCtrl',
                      access: access.user
                    })
                    .otherwise({
                        redirectTo: '/',
                        access: access.public
                    });


            growlProvider.globalTimeToLive(3000);

        })
        .run(['$rootScope', '$location', '$log', 'authService', 'growl', function ($rootScope, $location, $log, authService, growl) {

            $rootScope.$on("$routeChangeStart", function (event, next, current) {
                $log.debug(next);
                $rootScope.error = null;
                if (!authService.authorize(next.access)) {
                    if (authService.isLoggedIn()) {
                        console.log("isLoggedIn");
                        $location.path('/player');
                    }
                    else {
                        $location.path('/signin');
                    }
                }

                // Growl message processing from URL params
                var urlParams = $location.search();
                if( urlParams['message'] ) {
                    switch (urlParams['message_type']) {
                        case "success": growl.success(urlParams['message']);  break;
                        case "warning": growl.warning(urlParams['message']);  break;
                        case "info":  growl.info(urlParams['message']); break;
                        default: growl.error(urlParams['message']);
                    }
                    //clear url params
                    $location.search("message", null);
                    $location.search("message_type", null);
                }

            });


            $rootScope.isLoggedIn = function() {
                var res = authService.isLoggedIn();
                console.log("isLoggedIn:" + res);
                return res;
            };

        }]);
