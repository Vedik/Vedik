'use strict';

angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http) {
    $scope.message = 'Hello';
    $scope.submitted = false;
    $scope.liked=false;
  
    $http.get('/api/posts/').success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts.articleId);
    });
    
     $scope.like = function(postId){
        $http.get('/api/posts/'+postId+'/like').success(function (response){
            console.log(response);
            if(response.added==true){
                $scope.liked = true;
            }
        });
    }
    $scope.unlike = function(postId){
        $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.liked = false;
            }
        });
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
    var noteTemplate = '<div><div class="col-md-12"><div class="text_type_post" id="article"><a href="#"><span id="event_post_heading">{{content.articleId.articleName}}</span></a></br>{{content.articleId.content}}</br></br><div><p>by<a href="#"> {{content.uploader.name}}</a></p><span id="respond_post" ng-hide="liked" ng-click="like({{content.articleId._id}})"><a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Like</a></span><span id="respond_post" ng-show="liked" ng-click="unlike(content.articleId._id)"><a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Unlike</a></span></div></div><span id="post_time">{{content.articleId.createdOn}}</span></div></div>';
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
