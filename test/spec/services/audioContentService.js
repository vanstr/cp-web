'use strict';

describe('Service: audioContentService', function () {

  // load the service's module
  beforeEach(module('cpWebApp'));

  // instantiate service
  var audioContentService;
  beforeEach(inject(function (_audioContentService_) {
    audioContentService = _audioContentService_;
  }));

  it('should do something', function () {
    expect(!!audioContentService).toBe(true);
  });

});
