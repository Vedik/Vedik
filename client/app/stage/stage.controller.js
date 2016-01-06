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
        if($scope.isFollowing){
            $scope.follow='Following';
        }
        else{
            $scope.follow='Follow';
        }
    });

    $http.get('/api/posts/stage/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });

    $http.get('/api/events/showForStage/'+id).success( function (response){
        console.log(response);
        $scope.eventsList=response;
    })

    $scope.followVedik = function(){
        console.log('gdhs');
        if(!$scope.isFollowing){
            $http.get('/api/stages/'+id+'/addSubscriber').success(function (response){
                console.log(response);
                if(response.added==true){
                    $scope.isFollowing = true;
                    $scope.follow='Following';
                }
            });
        }
        else {
            $http.delete('/api/stages/'+id+'/deleteSubscriber').success(function (response){
                console.log(response);
                if(response.removed==true){
                    $scope.isFollowing = false;
                    $scope.follow='Follow';
                }
            });
        }
        

        
    }
   

  });
