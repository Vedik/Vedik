'use strict';

describe('Controller: FormTemplatesCtrl', function () {

  // load the controller's module
  beforeEach(module('myAppApp'));

  var FormTemplatesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FormTemplatesCtrl = $controller('FormTemplatesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
