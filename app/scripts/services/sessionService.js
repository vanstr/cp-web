'use strict';

/**
 * @ngdoc service
 * @name cpWebApp.session
 * @description
 * # session
 * Service in the cpWebApp.
 */
angular.module('cpWebApp')
	.service('sessionService', function($cookies) {
			var session = {};

			if ($cookies['PLAY_SESSION']) {
				console.log("$cookies['PLAY_SESSION']" + $cookies['PLAY_SESSION']);
				// read Play session cookie
				var rawCookie = $cookies['PLAY_SESSION'];
				var rawData = rawCookie.substring(rawCookie.indexOf('-') + 1, rawCookie.length - 1);

				var list = rawData.split("&");

				$.each(list, function(key, rawPair) {
					var pair = rawPair.split('=');
					session[pair[0]] = pair[1];
				});
			}
			return session;
	});
