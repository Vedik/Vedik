'use strict';

angular.module('myAppApp')
  .controller('ViewPageCtrl', function ($scope,$location,User,$http) {
    $scope.message = 'Hello';
    $scope.toggleVal = false;
    //var vidCode = $stateParams.vidCode;
    //console.log(vidCode);
    //$scope.vidCode =vidCode;
    //console.log($scope.vidCode);
    var a = $location.url();
    var b=[];
    b = a.split('viewPage/');
    var c = b[1].split('#');
    console.log(c[0]);
    var refresh = function (){
      $http.get('/api/videos/'+c[0]).success(function (response){
        console.log(response);
        $scope.video = response;
      });
    }
    refresh();
    $scope.vidCode = c[0];
    console.log($scope.vidCode);
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
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        refresh();
      });
    }
    $scope.edit = function (id,editData){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log('the edited document is '+response);
        refresh();
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



(function () {
  'use strict';
  angular
      .module('myAppApp')
      .controller('DemoCtrl', DemoCtrl);
  function DemoCtrl ($timeout, $q) {
    this.chipText = 'Football';
  }
})();

