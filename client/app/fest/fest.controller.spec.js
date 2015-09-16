'use strict';

describe('Controller: FestCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var FestCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FestCtrl = $controller('FestCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
