'use strict';

angular.module('myAppApp')
  .controller('DashboardCtrl', function ($scope,$state, Auth) {
    /*$scope.message = 'Hello';
    $scope.slots = ;
    */
    // need to code DashboardService service
    $scope.genres = ['horror','funny']; 
    $scope.limit = 3;
    $scope.user = Auth.getCurrentUser();
    $scope.val=true;

    $scope.loadMore = function () {
    	$scope.limit = $scope.limit+1;
    };

    $scope.toUploadPortal = function () {
    	$state.go('uploadPortal');
    };
  });

  $(document).ready(function(){
    $("#unknown").mouseenter(function(){
        $(this).hide();
    });
});