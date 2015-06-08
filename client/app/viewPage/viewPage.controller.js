'use strict';

angular.module('myAppApp')
  .controller('ViewPageCtrl', function ($scope,$stateParams, User) {
    $scope.message = 'Hello';
    var vidCode = $stateParams.vidCode;
    console.log(vidCode);
    $scope.vidCode =vidCode;
    console.log($scope.vidCode);
    $scope.user = User.get();
  })
  .directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe width="560" height="315" src="{{url}}" frameborder="0" allowfullscreen></iframe>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal);
           }
        });
    }
  };
});;
