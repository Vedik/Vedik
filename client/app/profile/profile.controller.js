'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope,$location, Auth, $state,User,$http,$modal) {
    $scope.message = 'Hello';
    var name = $location.url().split('/profile/')[1];
    console.log(name);
    $http.get('/api/users/'+name).success(function (response){
      $scope.user = response;
      console.log(response);
    });
   $scope.watchVid = function (vidurl) {
   	var a = [];
   	a = vidurl.split('watch?v=');
   	console.log(a[1]);
    $scope.vidCode = a[1];
   	//$state.go('viewPage',{'vidCode':a[1]});
   	$location.url('/viewPage/'+a[1]);
   };

   $scope.openModal = function (id){
    var modalInstance = $modal.open({
      animation: true,
      templateUrl:'myModalContent.html' ,
      controller: 'ModalInstanceCtrl',
      resolve: {
          vidCode: function(){
            return id;
          },
          user: function(){
            return $scope.user;
          }
        }
    });
   }
  });

angular.module('myAppApp').controller('ModalInstanceCtrl',function ($scope,$modalInstance,vidCode, user,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.vidCode=vidCode;
  $http.get('/api/videos/'+vidCode).success(function (response){
    $scope.video = response;
    console.log(response);
  });
  $scope.user = user;

  $scope.rating1 = 5;
  $scope.rateFunction = function(rating) {
    console.log("Rating selected: " + rating);
    $http.post('/api/videos/ratings/'+$scope.vidCode,{rating:rating}).success(function (response){
      console.log(response);
      $scope.rating1 = rating;
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});