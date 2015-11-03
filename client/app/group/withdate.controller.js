angular.module('myAppApp').controller('DatepickerDemoCtrl', function ($scope, $http) {
  
$scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

$scope.bookPost=function(post_id){
  var date = $scope.dt ;
  var d = date.getDate();
  var m = date.getMonth()+1;
  var y = date.getFullYear();
  var bookingDate=d+"-"+m+"-"+y;
  console.log(d+"-"+m+"-"+y);
   $http.post('/api/bookings/'+post_id,{bookingDate:bookingDate}).success(function (response){
    console.log(booked);
  })
 
};

  $scope.dtAdmin=$scope.dt;
$scope.bookingDate=function(post_id){

  
 
  var dateAdmin = $scope.dtAdmin;    
    var d = dateAdmin.getDate();
    var m = dateAdmin.getMonth()+1;
    var y = dateAdmin.getFullYear();
    var bookingDate=d+"-"+m+"-"+y;

    
     $http.get('/api/bookings/'+bookingDate).success(function (response){
        console.log(response);
        $scope.bookings = response;
        console.log($scope.bookings);
    });
};














/*********************************from angularjs datepicker************/

  

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.openED = function($event) {    //OpenEndDate
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedED = true;
    };
    $scope.openSD = function($event) {    //OpenStart Date
      $event.preventDefault();
      $event.stopPropagation();

      $scope.openedSD = true;
    };

  $scope.open = function($event) {    //Open Date
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];

  // var tomorrow = new Date();
  // tomorrow.setDate(tomorrow.getDate() + 1);
  // var afterTomorrow = new Date();
  // afterTomorrow.setDate(tomorrow.getDate() + 2);
  // $scope.events =
  //   [
  //     {
  //       date: tomorrow,
  //       status: 'full'
  //     },
  //     {
  //       date: afterTomorrow,
  //       status: 'partially'
  //     }
  //   ];

  // $scope.getDayClass = function(date, mode) {
  //   if (mode === 'day') {
  //     var dayToCheck = new Date(date).setHours(0,0,0,0);

  //     for (var i=0;i<$scope.events.length;i++){
  //       var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

  //       if (dayToCheck === currentDay) {
  //         return $scope.events[i].status;
  //       }
  //     }
  //   }

  //   return '';
  // };
});