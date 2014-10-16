'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.authService
 * @description
 * # authService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
  .service('authService', function($http, $log, sessionService){

    $log.debug(sessionService);

    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = { id: '', username: '', role: userRoles.public };

    if( sessionService['userId'] ){
        $log.debug("get user from sessionService");
        currentUser = { id: sessionService['userId'], username: sessionService['username'], role: userRoles.user };
    }


    $log.debug(currentUser);

    function changeUser(user) {
        angular.extend(currentUser, user);
    }

    return {
        authorize: function(accessLevel, role) {
            if(role === undefined)
                role = currentUser.role;
            $log.debug(accessLevel);
            return accessLevel.bitMask & role.bitMask;
        },
        isLoggedIn: function(user) {
            if(user === undefined)
                user = currentUser;
            return user.role.title == userRoles.user.title || user.role.title == userRoles.admin.title;
        },
        register: function(user, success, error) {
            $http.post('/api/user', user).success(function(res) {
                changeUser(res);
                success();
            }).error(error);
        },
        login: function(user, success, error) {
            $log.debug(user);
            $http.post('/api/login', user).success(function(user){
                user.role = userRoles.user;
                changeUser(user);
                success(user);
            }).error(function(){
                $log.error("Failed to logout");
                error();
            });
        },
        logout: function(success, error) {
            $http.get('/api/logout').success(function(){
                changeUser({
                    id: '',
                    username: '',
                    role: userRoles.public
                });
                success();
            }).error(error);
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});