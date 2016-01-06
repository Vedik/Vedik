'use strict';

angular.module('myAppApp')
  .controller('DashboardCtrl', function ($scope,$state, Auth,$http,ClubEventService,$log) {
    /*$scope.message = 'Hello';
    $scope.slots = ;



    */
    // need to code DashboardService service

     $scope.loading=true;
     console.log($scope.loading);



    $scope.genres = ['horror','funny']; 
    $scope.limit = 3;
    $scope.user = Auth.getCurrentUser();
    $scope.val=true;
    $scope.todaysVedik="true";
    

    

    $scope.loadMore = function () {
    	$scope.limit = $scope.limit+1;
    };

    $scope.toUploadPortal = function () {
    	$state.go('uploadPortal');
    };

     var dateAdmin = new Date(Date.now());    
    var d = dateAdmin.getDate();
    var m = dateAdmin.getMonth()+1;
    var y = dateAdmin.getFullYear();
    var todayDate=d+"-"+m+"-"+y;
     console.log('bookingDate');
    console.log(todayDate);

     $http.get('/api/bookings/'+todayDate).success(function (response){
        console.log(response);
        $scope.bookings = response;
        
        console.log($scope.bookings);
    });
 
      $http.get('/api/posts/').success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });

     $http.get('/api/clubs/').success(function (response){
        console.log(response);
        $scope.clubsList = response;
        

    });
     
       $http.get('/api/events/').success(function (response){
            console.log(response);
            $scope.events=response.events;
            $scope.tEvents=response.tEvents;
        }) 

       $scope.redirect=function(subOnl,index){
        if(subOnl){
            $scope.redirect[index]="competition";
        }
        else
        {
            $scope.redirect[index]="event";
        }
       }

       $scope.splitIn3 = function (index){
            index= index/3;
            if (index === parseInt(index, 10))
            {
                return true;
            }
            else
            {
                return false;
            }
       }
    $scope.isLoaded=true;
     
  })
    ;
