'use strict';

angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http) {
    $scope.message = 'Hello';
    $scope.submitted = false;

  
    $http.get('/api/posts/').success(function (response){
        console.log(response);
        $scope.posts = response;


        
        var i;
        for(i=0;i<$scope.posts.length;i++)
        {
            if($scope.posts[i].type==1)
            {
                /*var id=$scope.posts.articleId._id;
                $http.get('/api/likes/'+id).success(function (response){
                    $scope.posts[i].liking=response.liked;
                    console.log($scope.posts[i].liking);
                    console.log('abcd');
                });*/
                console.log('abcd');
            
            }
        }
        
        
    });
    $scope.postId = function(postId){
        console.log('df');
        console.log(postId);
    }
    
    /*
    $scope.submit = function (form){
    	$scope.submitted = true;
    	//validation
    	form.uploader = Auth.getCurrentUser()._id;
    	console.log(form.uploader);
    	UploadPortalService.submitForm(form).then(function (response){
    		if(response){ console.log(response); }
    		else {console.log('no data received'); }
    	});
    };*/
});
