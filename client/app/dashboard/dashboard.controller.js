'use strict';

angular.module('myAppApp')
  .controller('DashboardCtrl', function ($scope,$state, Auth,$http,ClubEventService,$log) {
    /*$scope.message = 'Hello';
    $scope.slots = ;


    */
    // need to code DashboardService service


    $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };



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
    var bookingDate=d+"-"+m+"-"+y;
     console.log('bookingDate');
    console.log(bookingDate);

    
     $http.get('/api/bookings/'+bookingDate).success(function (response){
        console.log(response);
        $scope.bookings = response;
        $scope.posts=$scope.bookings.postId;
        console.log($scope.bookings);
    });

     $http.get('/api/clubs/').success(function (response){
        console.log(response);
        $scope.clubsList = response;
        

    });

     $http.get('/api/events/').success(function (response){
        console.log(response);
     })
  })
;
