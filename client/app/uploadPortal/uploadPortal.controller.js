'use strict';

angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http) {
    $scope.message = 'Hello';
    $scope.submitted = false;
    
  
    $http.get('/api/posts/').success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });
    
    /* $scope.like = function(postId){
        $http.get('/api/posts/'+postId+'/like').success(function (response){
            console.log(response);
            scope.content.like.length=response;
            
        });
    }
    $scope.unlike = function(postId){
        $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.liked = false;
            }
        });
    }*/



    
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
.directive('contentItem', function ($compile, $http) {
    var imageTemplate = '<div><div class="post_div thumbs_wrap col-md-12" ng-click="viewImage(content.imageId._id)"><div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.imageId.picUrl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.imageId.imgName}}</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.imageId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.imageId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Comment</a></span>{{content.createdOn}}</span></div></div>';
    var videoTemplate = '<div><div class="post_div thumbs_wrap col-md-12"  ng-click="viewVideo(content.videoId.vidurl) data-toggle="modal" data-target="#videoview" onclick="document.getElementById(for_blur).style.filter = blur(40px)"><div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.videoId.posterurl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.videoId.vidname}}</span><span class="play"><img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">,njhgfcxz</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.videoId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.videoId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a>  {{content.createdOn}}</span></div></div>';
    var articleTemplate = '<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="#">'  +
                                            '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.articleId.content}}</br></br>'  +
                                        '<div>' +
                                            '<p>by<a href="#"> {{content.uploader.user.name}}</a></p>'  +
                                            '<span id="respond_post" ng-hide="likingName" ng-click="like(content.articleId._id)">'  +
                                                '<a href="#">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Like'  +
                                                '</a>'  +
                                            '</span>'   +
                                            '<span id="respond_post" ng-show="likingName" ng-click="unlike(content.articleId._id)">'    +
                                                '<a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Unlike</a>'    +
                                            '</span>'   +
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">{{content.articleId.createdOn}}</span>'   +
                                '</div>'    +
                            '</div>';
    var articleClubTemplate ='<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="#">'  +
                                            '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.articleId.content}}</br></br>'  +
                                        '<div>' +
                                            '<p>by<a href="#"> {{content.uploader.club.name}}</a></p>'  +
                                            '<span id="respond_post" ng-hide="likingName" ng-click="like(content.articleId._id)">'  +
                                                '<a href="#">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Like'  +
                                                '</a>'  +
                                            '</span>'   +
                                            '<span id="respond_post" ng-show="likingName" ng-click="unlike(content.articleId._id)">'    +
                                                '<a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Unlike</a>'    +
                                            '</span>'   +
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">{{content.articleId.createdOn}}</span>'   +
                                '</div>'    +
                            '</div>';
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
                template = articleTemplate;
                break;
            case 4:
                template = articleClubTemplate;
                break;
            case 5:
                template = imageTemplate;
                break;
            case 6:
                template = videoTemplate;
                break;
        }
        
        return template;
    }

    

    var linker = function(scope, element, attrs, controller) {

        element.html(getTemplate(scope.content.type)).show();

        $compile(element.contents())(scope);

        if(scope.content.type==1)
        {
            var postIdLike=scope.content.articleId._id;
            var likingName='liking'+postIdLike;
            console.log(likingName);
            $http.get('/api/posts/likeInfo/'+postIdLike).success(function (response){
                scope.likingName=response;
                console.log(scope.likingName);
            });
        }


        scope.like = function(postId){
            $http.get('/api/posts/'+postId+'/like').success(function (response){
                console.log(response);
                var likingName='liking'+postId;
                scope.content.like.length=response;
                scope.likingName = true;
                
            });
        };

      

        
        

        scope.unlike = function(postId){
            $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
                console.log(response);
                var likingName='liking'+postId;
                scope.content.like.length=response;
                scope.likingName = false;
                
            });
        };

        scope.viewVideo =function(vidurl){
            scope.hash=vidurl;
        
        };

        scope.viewImage =function(imageId){
        
    }   ;
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
