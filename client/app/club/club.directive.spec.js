'use strict';

describe('Directive: club', function () {

  // load the directive's module and view
  beforeEach(module('myAppApp'));
  beforeEach(module('app/club/club.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<club></club>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the club directive');
  }));
});