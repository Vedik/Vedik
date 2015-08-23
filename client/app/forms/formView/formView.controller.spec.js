'use strict';

describe('Controller: FormViewCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var FormViewCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormViewCtrl = $controller('FormViewCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
