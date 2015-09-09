'use strict';

angular.module('myAppApp')
  .controller('StageCtrl', function ($scope,$location,$http,User) {
    $scope.message = 'Hello';
    $scope.user = User.get();
    var url = $location.url();
    var id = url.split('/stage/')[1];
    console.log(name);
    $http.get('/api/stages/'+id).success(function (response){
    	console.log(response);
    	$scope.stage = response.stage;
        console.log($scope.stage);
        $scope.isFollowing = response.isFollowing;
    });

    $http.get('/api/posts/stage/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
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
