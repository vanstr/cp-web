'use strict';

describe('Controller: CommonFooterplayerCtrl', function () {

  // load the controller's module
  beforeEach(module('cpWebApp'));

  var CommonFooterplayerCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommonFooterplayerCtrl = $controller('CommonFooterplayerCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
