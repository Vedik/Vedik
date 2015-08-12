'use strict';

angular.module('myAppApp')
  .directive('club', function () {
    return {
      templateUrl: 'app/club/club.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      }
    };
  });