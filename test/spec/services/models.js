'use strict';

describe('Service: models', function () {

  // load the service's module
  beforeEach(module('vnbidding.github.ioApp'));

  // instantiate service
  var models;
  beforeEach(inject(function (_models_) {
    models = _models_;
  }));

  it('should do something', function () {
    expect(!!models).toBe(true);
  });

});
