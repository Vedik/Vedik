'use strict';

describe('Controller: UploadPortalCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var UploadPortalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UploadPortalCtrl = $controller('UploadPortalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
