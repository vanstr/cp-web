'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.authService
 * @description
 * # authService
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
  .service('authService', function($http, $rootScope, $log, sessionService, audioPlayer, $q){

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
       $rootScope.user = currentUser;
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
            $http.post('/api/register', user).success(function(res) {
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
                $log.error("Failed to login");
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
                audioPlayer.clear();
                success();
            }).error(error);
        },
        deleteAccount: function(success, error) {
            $http.delete('/api/user').success(function(){
                changeUser({
                    id: '',
                    username: '',
                    role: userRoles.public
                });
                audioPlayer.clear();
                success();
            }).error(error);
        },
        changeUserPassword: function(pwd, newPwd, success2, error) {
            var passwordsStructure = "{\"password\": \""+pwd+"\", \"new_password\": \""+newPwd+"\"}";

            $log.debug(passwordsStructure);
            $http.post('/api/user/password', passwordsStructure).success(function(res){
                success2(res);
            }).error(function(res){
                $log.error("Failed to changeUserPassword" + res);
                error(res);
            });
        },
        addLoginAndPasswordForExistingUser: function(user, success2, error) {
            $log.debug(user);
            $http.post('/api/user/link', user).success(function(res){
                success2(res);
            }).error(function(res){
                $log.error("Failed to addLoginAndPasswordForExistingUser" + res);
                error(res);
            });
        },
        updateUserInfo: function(user, success2, error) {
            $log.debug(user);
            $http.post('/api/user/info', user).success(function(res){
                success2(res);
                updateUser();
            }).error(function(res){
                $log.error("Failed to updateUserInfo" + res);
                error(res);
            });
        },
        dropboxAuthURL: function () {
            var deferred = $q.defer();
            $http.get('/api/dropbox/url/authorize').success(function (url) {
                deferred.resolve(url);
            }).error();

            return deferred.promise;
        },
        dropboxAddingURL: function () {
            var deferred = $q.defer();
            $http.get('/api/dropbox/url/add').success(function (url) {
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
        gdriveAuthURL: function () {
            var deferred = $q.defer();
            $http.get('/api/drive/url/authorize').success(function (url) {
                deferred.resolve(url);
            }).error();

            return deferred.promise;
        },
        gdriveAddingURL: function () {
            var deferred = $q.defer();
            $http.get('/api/drive/url/add').success(function (url) {
                deferred.resolve(url);
            }).error();

            return deferred.promise;
        },
        gdriveDelete: function () {
            var deferred = $q.defer();
            $http.delete('/api/drive').success(function () {
                deferred.resolve();
            }).error();

            return deferred.promise;
        },
        accessLevels: accessLevels,
        userRoles: userRoles,
        user: currentUser
    };
});