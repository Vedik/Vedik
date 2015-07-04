'use strict';

angular.module('myAppApp')
  .controller('ViewPageCtrl', function ($scope,$location,User,$http) {
    $scope.message = 'Hello';
    //var vidCode = $stateParams.vidCode;
    //console.log(vidCode);
    //$scope.vidCode =vidCode;
    //console.log($scope.vidCode);
    var a = $location.url();
    var b = a.split('viewPage/');
    console.log(b[1]);
    $http.get('/api/videos/'+b[1]).success(function (response){
      console.log(response);
      $scope.video = response;
    });
    $scope.vidCode = b[1];
    console.log($scope.vidCode);

    $scope.user = User.get();

    $scope.submit = function (){
    //validation
      console.log($scope.commentData);
      $http.post('/api/comments/',{commentData:$scope.commentData,videoId:$scope.video._id}).success(function (response){
        console.log(response);
      });
    }
  })
  .directive('myYoutube', function($sce) {
  return {
    restrict: 'EA',
    scope: { code:'=' },
    replace: true,
    template: '<iframe width="80" height="45" src="{{url}}" frameborder="0" style="box-sizing:border-box;box-shadow:0px 5px 10px black;" allowfullscreen></iframe>',
    link: function (scope) {
        console.log('here');
        scope.$watch('code', function (newVal) {
           if (newVal) {
               scope.url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + newVal+'?autoplay=0');
           }
        });
    }
  };
});;
