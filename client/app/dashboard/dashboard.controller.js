'use strict';

angular.module('myAppApp')
  .controller('DashboardCtrl', function ($scope,$state, Auth,$http) {
    /*$scope.message = 'Hello';
    $scope.slots = ;
    */
    // need to code DashboardService service
    $scope.genres = ['horror','funny']; 
    $scope.limit = 3;
    $scope.user = Auth.getCurrentUser();
    $scope.val=true;

   function Ctrl2($scope, UploadPortalService) {
   
    $scope.for_blur = UploadPortalService.getProperty()
    }


    $scope.submit = function (form){
        //validation to be done
        $http.post('/api/stages',{name:form.stagename,description:form.description,posterUrl:form.posterUrl}).success(function (response){
            console.log(response);
            $scope.form={};
        })
    }

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
  })

