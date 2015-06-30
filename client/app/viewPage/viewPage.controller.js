'use strict';

angular.module('myAppApp')
  .controller('ViewPageCtrl', function ($scope,$location,User, $http) {
    $scope.message = 'Hello';
    //var vidCode = $stateParams.vidCode;
    //console.log(vidCode);
    //$scope.vidCode =vidCode;
    //console.log($scope.vidCode);
    $scope.user = User.get();
    var a = $location.url();
    var b = a.split('viewPage/');
    console.log(b[1]);
    $scope.vidCode = b[1];
    console.log($scope.vidCode);
    $scope.rating1 = 5;
    $http.get('/api/videos')
  $scope.rateFunction = function(rating) {
    console.log("Rating selected: " + rating);
    $http.post('/api/videos/ratings/'+$scope.vidCode,{rating:rating}).success(function (response){
      console.log(response);
      $scope.rating1 = rating;
    })
  };
    
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
