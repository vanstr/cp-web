'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.authService
 * @description
 * # authService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
  .service('authService', function($http, $log, sessionService, $q){

    $log.debug(sessionService);

    var accessLevels = routingConfig.accessLevels,
        userRoles = routingConfig.userRoles,
        currentUser = { id: '', username: '', role: userRoles.public };

    if( sessionService['userId'] ){
        $log.debug("update user if  session exist");
        currentUser = { id: sessionService['userId'], username: sessionService['username'], role: userRoles.user };
        updateUser();
    }

    function updateUser() {
        $http.get('/api/user').success(function (data) {
            changeUser(data);
        }).error();
    }

    function changeUser(user) {
       angular.extend(currentUser, user);
    }

    $log.debug(currentUser);

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
        dropboxAuthURL: function () {
            var deferred = $q.defer();
            $http.get('/api/dropboxAuthUrl').success(function (url) {
                deferred.resolve(url);
            }).error();

            return deferred.promise;
        },
        dropboxDelete: function () {
            var deferred = $q.defer();
            $http.delete('/api/dropbox').success(function () {
                deferred.resolve();
            }).error();

            return deferred.promise;
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});