'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope, Auth, $state,User) {
    $scope.message = 'Hello';
    if(!Auth.isLoggedIn()){ $state.go('login');}

   $scope.user = User.get();

  });
