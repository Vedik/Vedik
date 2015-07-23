'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope,$location, Auth, $state,User,$http) {
    $scope.message = 'Hello';
    $scope.credits=[{name:'Directors'},{name:'Editors'}];
    var name = $location.url().split('/profile/')[1];
    console.log(name);
    $http.get('/api/users/'+name).success(function (response){
      $scope.user = response;
      console.log(response);
    });
    console.log($scope.user);
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn()+" is isLoggedIn");

    $scope.tags=[];



    $scope.getSuggestions = function (query){
      return $http.get('/api/users/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    }

   $scope.watchVid = function (vidurl) {
   	var a = [];
   	a = vidurl.split('watch?v=');
   	console.log(a[1]);
   	//$state.go('viewPage',{'vidCode':a[1]});
   	$location.url('/viewPage/'+a[1]);
   	
   };

  });
