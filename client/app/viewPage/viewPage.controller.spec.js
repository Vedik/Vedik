'use strict';

describe('Controller: ViewPageCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var ViewPageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ViewPageCtrl = $controller('ViewPageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
