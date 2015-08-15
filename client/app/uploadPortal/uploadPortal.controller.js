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
                
                var postId=$scope.posts[i].articleId._id;
                var liked
                
                $http.get('/api/likes/'+postId).success(function (response){
                        console.log('sdf');
                        if(response==false)
                        {
                            liked=false;
                        }
                        else
                        {
                            liked=true;
                        }
                    
                    console.log("liked = %s",liked);
                    console.log('abcd');
                });
                
            
            }
             else if($scope.posts[i].type==2)
            {
                
                var postId=$scope.posts[i].imageId._id;
                var liked
                
                $http.get('/api/likes/'+postId).success(function (response){
                        console.log('sdf');
                        if(response==false)
                        {
                            liked=false;
                        }
                        else
                        {
                            liked=true;
                        }
                    
                    console.log("liked = %s",liked);
                    console.log('abcd');
                });
                
            
            }
             else //type=3
            {
                
                var postId=$scope.posts[i].videoId._id;
                var liked
                
                $http.get('/api/likes/'+postId).success(function (response){
                        console.log('sdf');
                        if(response==false)
                        {
                            liked=false;
                        }
                        else
                        {
                            liked=true;
                        }
                    
                    console.log("liked = %s",liked);
                    console.log('abcd');
                });
                
            
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
