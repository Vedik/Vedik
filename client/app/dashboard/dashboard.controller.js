'use strict';

angular.module('myAppApp')
  .controller('DashboardCtrl', function ($scope,$state, Auth, DashboardService) {
    /*$scope.message = 'Hello';
    $scope.slots = ;
    */
    // need to code DashboardService service
    $scope.genres = ["horror","funny"]; 
    $scope.limit = 3;
    $scope.user = Auth.getCurrentUser();

    $scope.loadMore = function () {
    	$scope.limit = $scope.limit+1;
    }

    $scope.toUploadPortal = function () {
    	$state.go('uploadPortal');
    }
  });