'use strict';

angular.module('myAppApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    /*var date = $scope.dt;
    console.log(date);
    var d = date.getDate();
    var m = date.getMonth()+1;
    var y = date.getFullYear();
    var bookingDate=d+"-"+m+"-"+y;*/

    $scope.bookingCheckbox=[];

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };
    $scope.bookingApproval = function (bookingCheckbox){
      console.log($scope.bookingCheckbox);
      $http.put('/api/bookings/'+bookingCheckbox).success( function (response){
          console.log('submitted');
      });
    };

     $scope.submitClub = function (form){
        //validation to be done
        $http.post('/api/clubs',{name:form.clubname,description:form.description,posterUrl:form.posterUrl}).success(function (response){
            console.log(response);
            $scope.form={};
        })
    };

    $scope.submitStage = function (form){
        //validation to be done
        $http.post('/api/stages',{name:form.stagename,description:form.description,posterUrl:form.posterUrl}).success(function (response){
            console.log(response);
            $scope.form={};
        })
    }

     $scope.submitCredit = function (creditDet){
      $http.post('/api/creditDets',{creditDetail:creditDet}).success(function (response){
        console.log(response);
        $scope.creditDet="";
      })
     };

  });
