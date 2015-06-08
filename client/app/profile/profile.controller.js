'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope,$location, Auth, $state,User) {
    $scope.message = 'Hello';
    if(!Auth.isLoggedIn()){ $state.go('login');}

   $scope.user = User.get();
   $scope.watchVid = function (vidurl) {
   	var a = [];
   	a = vidurl.split('watch?v=');
   	console.log(a[1]);
   	$state.go('viewPage',{'vidCode':a[1]});
   	
   };

  });
