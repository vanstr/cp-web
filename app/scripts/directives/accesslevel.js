'use strict';

/**
 * @ngdoc directive
 * @name cpWebApp.directive:accessLevel
 * @description
 * # accessLevel
 */
angular.module('cpWebApp')
        .directive('accessLevel', ['authService', function( authService) {
            return {
                restrict: 'A',
                link: function($scope, element, attrs) {

                    var prevDisp = element.css('display')
                      , userRole
                      , accessLevel;
                    // by default access only for registred
                    if(!accessLevel) accessLevel = authService.accessLevels.user;

                    $scope.user = authService.user;
                    $scope.$watch('user', function(user) {
                        userRole = user.role;
                        updateCSS();
                    }, true);

                    attrs.$observe('accessLevel', function(al) {
                        if(al) accessLevel = $scope.$eval(al);
                        updateCSS();
                    });

                    function updateCSS() {
                        if(userRole && accessLevel) {
                            if(!authService.authorize(accessLevel, userRole))
                                element.css('display', 'none');
                            else
                                element.css('display', prevDisp);
                        }
                    }
                }
            };
        }]);