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
                    
                });

                var id=$scope.posts[i].articleId.uploader;
                console.log('response');
                $http.get('/api/users/'+id).success(function (response){
                    var uploader=response;
                    console.log('response');
                });;    
                    
            
            }
             else if($scope.posts[i].type==2)
            {
                
                var postId=$scope.posts[i].imageId._id;
                var liked;
                
                $http.get('/api/likes/'+postId).success(function (response){
                        console.log('sdf');
                        if(response==false)
                        {
                            $scope.posts[i].lliked=false;
                        }
                        else
                        {
                            $scope.posts[i].lliked=true;
                        }
                    
                    console.log("liked = %s",$scope.posts[i].lliked);
                    console.log('abchjkmd');
                });
                console.log('abchjkmd');

                var id=$scope.posts[i].imageId.uploader;
                
                $http.get('/api/users/'+id).success(function (response){
                    var uploader=response;
                    console.log(uploader);
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
})
.directive('contentItem', function ($compile) {
    var imageTemplate = '<div><div class="img_div thumbs_wrap col-md-12"><div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.imageId.picUrl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.imageId.imgName}}</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.imageId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.imageId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Comment</a></span>{{content.createdOn}}</span></div></div>';
    var videoTemplate = '<div><div class="img_div thumbs_wrap col-md-12"  data-toggle="modal" data-target="#videoview" onclick="document.getElementById(for_blur).style.filter = blur(40px)"><div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.videoId.posterurl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.videoId.vidname}}</span><span class="play"><img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">,njhgfcxz</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.videoId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.videoId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a>  {{content.createdOn}}</span></div></div>';
    var noteTemplate = '<div><div class="col-md-12"><div class="text_type_post" id="article"><a href="#"><span id="event_post_heading">{{content.articleId.articleName}}</span></a></br>{{content.articleId.content}}</br></br><div><p>by<a href="#"> {{content.articleId.uploader.name}}</a></p><span id="respond_post"><a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> Like</a></span></div></div><span id="post_time">{{content.articleId.createdOn}}</span></div></div>';
    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 2:
                template = imageTemplate;
                break;
            case 3:
                template = videoTemplate;
                break;
            case 1:
                template = noteTemplate;
                break;
        }
        
        return template;
    }

    var linker = function(scope, element, attrs) {

        element.html(getTemplate(scope.content.type)).show();

        $compile(element.contents())(scope);
        
    }

    return {
        restrict: "E",
        link: linker,
        scope: {
            content:'='
        }
    };
});
;
