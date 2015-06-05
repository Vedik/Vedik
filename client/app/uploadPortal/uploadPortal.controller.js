'use strict';

angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,UploadPortalService) {
    $scope.message = 'Hello';
    $scope.submitted = false;
    $scope.submit = function (form){
    	$scope.submitted = true;
    	//validation
    	form.uploader = Auth.getCurrentUser()._id;
    	console.log(form.uploader);
    	UploadPortalService.submitForm(form).then(function (response){
    		console.log(response);
    	});
    }
  });
