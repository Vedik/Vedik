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
    b = b[1].split('#');
    console.log(b[0]);
    var refresh = function (){
      $http.get('/api/videos/'+b[0]).success(function (response){
        console.log(response);
        $scope.video = response;
      });
    }
    refresh();
    $scope.vidCode = b[0];
    $scope.user = User.get();

    $scope.submit = function (){
      if($scope.commentData===undefined){

      }
      else {
        console.log($scope.commentData);
        $http.post('/api/comments/',{commentData:$scope.commentData,videoId:$scope.video._id}).success(function (response){
          $scope.commentData='';
          console.log(response);
          refresh();
        });
      }
    }

    $scope.delete = function (id){
      $http.delete('/api/comments/:id').success(function (response){
        console.log('the document deleted is '+response);
      });
    }
    $scope.edit = function (id){
      $http.put('/api/comments/:id',{commentData:$scope.commentData}).success(function (response){
        console.log('the edited document is '+response);
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
