'use strict';

describe('Service: audioPlayer', function () {

  // load the service's module
  beforeEach(module('cpWebApp'));

  // instantiate service
  var audioPlayer;
  beforeEach(inject(function (_audioPlayer_) {
    audioPlayer = _audioPlayer_;
  }));

  it('should do something', function () {
    expect(!!audioPlayer).toBe(true);
  });

});
