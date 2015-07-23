'use strict';

describe('Controller: StageCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var StageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StageCtrl = $controller('StageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
