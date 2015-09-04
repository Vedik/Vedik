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

     $http.get('/api/bookings/').success(function (response){
        console.log(response);
        $scope.bookings = response;
        console.log($scope.bookings);
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
.directive('contentItem', function ($compile, $http,$modal) {
    var imageTemplate = '<div><div class="post_div thumbs_wrap col-md-12" ng-click="viewImage(content.imageId._id)"><div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.imageId.picUrl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.imageId.imgName}}</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.imageId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.imageId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Comment</a></span>{{content.createdOn}}</span></div></div>';
    var videoTemplate = '<div><div class="post_div thumbs_wrap col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" onclick="document.getElementById(for_blur).style.filter = blur(40px)">{{content.videoId.vidurl}}<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"><img src="{{content.videoId.posterurl}}" id="img_post"><span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;"></span><span id="img_name">{{content.videoId.vidname}}</span><span class="play"><img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">,njhgfcxz</span><span class="thumb_trnsprnt"></span><span id="user_art_info"><div id="a"><div id="vid_data">{{content.videoId.description}}</div><span style="bottom:20px;left:10px;position:absolute">Views : {{content.videoId.view_count}}</span></div></span></div><span id="post_time"><span id="respond_post"><a href="#"><img src="http://cadijordan.com/wp-content/uploads/2013/11/like3.png" width="20px" height="20px"> Like</a>  {{content.createdOn}}</span></div></div>';
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
                                    '<div>' +
                                        '<div ng-controller="DatepickerDemoCtrl">' +
                                            '<form name="form" ng-submit="bookPost(content._id)" ng-model="form" >' +
                                                '<div class="col-md-6 datepckr">'+
                                                    '<p class="input-group">' +
                                                        '<input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="dt" is-open="opened" min-date="minDate" max-date="' + '"2037-06-22"' + '" datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" style="height:34px" />' +
                                                        '<span class="input-group-btn">' +
                                                            '<button type="button" class="btn btn-default" ng-click="open($event)"><i class="glyphicon glyphicon-calendar"></i></button>' +
                                                        '</span>' +
                                                    '</p>' +
                                                '</div>' +
                                                '<button type="submit" class="b2w">Book</button>' +
                                            '</form>' +
                                        '</div>' +
                                    '</div>' +
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
          
            console.log(vidurl);
           
            var modalInstance = $modal.open({
              animation: true,
              templateUrl:'myModalContent.html' ,
              controller: 'ModalInstanceCtrl',
              resolve: {
                  vidCode: function(){
                    return(vidurl);
                  },
                  user: function(){
                    return scope.user;
                  }
                }
            });
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

angular.module('myAppApp').controller('ModalInstanceCtrl',function ($scope,$modalInstance,vidCode, user,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
  $scope.vidCode=vidCode;
  $http.get('/api/videos/'+vidCode).success(function (response){
    $scope.video = response;
    console.log(response);
  });
  $scope.user = user;

  $scope.rating1 = 5;
  $scope.rateFunction = function(rating) {
    console.log("Rating selected: " + rating);
    $http.post('/api/videos/ratings/'+$scope.vidCode,{rating:rating}).success(function (response){
      console.log(response);
      $scope.rating1 = rating;
    })
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});