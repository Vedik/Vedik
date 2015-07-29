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
  });

  $(document).ready(function(){
    $("#unknown").mouseenter(function(){
        $(this).hide();
    });
});