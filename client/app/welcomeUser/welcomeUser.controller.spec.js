'use strict';

describe('Controller: WelcomeUserCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var WelcomeUserCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WelcomeUserCtrl = $controller('WelcomeUserCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
