'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope,$location, Auth, $state,User,$http) {
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
   	//$state.go('viewPage',{'vidCode':a[1]});
   	$location.url('/viewPage/'+a[1]);
   	
   };

  });
