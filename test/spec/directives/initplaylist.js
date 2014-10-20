'use strict';

describe('Directive: initPlaylist', function () {

  // load the directive's module
  beforeEach(module('cpWebApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<init-playlist></init-playlist>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the initPlaylist directive');
  }));
});
