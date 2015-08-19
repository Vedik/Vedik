'use strict';

angular.module('myAppApp')
  .controller('AdminCtrl', function ($scope, $http, Auth, User) {

    // Use the User $resource to fetch all users
    $scope.users = User.query();

    $scope.delete = function(user) {
      User.remove({ id: user._id });
      angular.forEach($scope.users, function(u, i) {
        if (u === user) {
          $scope.users.splice(i, 1);
        }
      });
    };


     $scope.submit = function (form){
        //validation to be done
        $http.post('/api/clubs',{name:form.clubname,description:form.description,posterUrl:form.posterUrl}).success(function (response){
            console.log(response);
            $scope.form={};
        })
    }

  });
