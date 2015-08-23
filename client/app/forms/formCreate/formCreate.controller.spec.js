'use strict';

describe('Controller: FormCreateCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var FormCreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormCreateCtrl = $controller('FormCreateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
