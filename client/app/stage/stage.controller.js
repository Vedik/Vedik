'use strict';

angular.module('myAppApp')
  .controller('StageCtrl', function ($scope,$location,$http,User) {
    $scope.message = 'Hello';
    $scope.user = User.get();
    var url = $location.url();
    var name = url.split('/stage/')[1];
    console.log(name);
    $http.get('/api/stages/'+name).success(function (response){
    	console.log(response);
    	$scope.stage = response.stage;
        $scope.isFollowing = response.isFollowing;
    });
    $scope.follow = function(){
        $http.get('/api/stages/'+name+'/addSubscriber').success(function (response){
            console.log(response);
            if(response.added==true){
                $scope.isFollowing = true;
            }
        });
    }
    $scope.unfollow = function(){
        $http.delete('/api/stages/'+name+'/deleteSubscriber').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.isFollowing = false;
            }
        });
    }

  });
