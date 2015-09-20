'use strict';

angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http, UploadPortalService,User) {
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

    $scope.blur = function ()   {
        UploadPortalService.setProperty().then(function (response){
                console.log(response);
        }); 
    };

    
    
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

 //onclick="document.getElementById(for_blur).style.filter = blur(40px)"

})
.directive('contentItem', function ($compile, $http,$modal) {
    var imageTemplate = '<div>'+
                            '<div class="post_div thumbs_wrap col-md-12">'+
                                '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                    '<img src="{{content.imageId.picUrl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;">'+
                                    '</span>'+
                                    '<span id="img_name">{{content.imageId.imgName}}</span>'+
                                    '<span class="thumb_trnsprnt"></span>'+
                                    '<span id="user_art_info">'+
                                        '<div id="a">'+
                                            '<div id="vid_data">{{content.imageId.description}}</div>'+
                                            '<span style="bottom:20px;left:10px;position:absolute">Views : {{content.imageId.view_count}}</span>'+
                                        '</div>'+
                                    '</span>'+
                                '</div>'+
                                '<span id="post_time">'+
                                    '<span id="respond_post">'+
                                        '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}'+
                                    '</span>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></spa>'+
                                '</span>'+
                            '</div>'+                            
                        '</div>';
    var videoTemplate = '<div  ng-click=blur()>' +
                            '<div class="post_div thumbs_wrap col-md-12" >'+
                               '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    '<img src="{{content.videoId.posterurl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;">'+
                                    '</span>'+
                                    '<span id="img_name">'+
                                        '{{content.videoId.vidname}}'+
                                    '</span>'+
                                    '<span class="play">'+
                                        '<img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">'+
                                    '</span>'+
                                    '<span class="thumb_trnsprnt"></span>'+
                                    '<span id="user_art_info">'+
                                        '<div id="a">'+
                                            '<div id="vid_data">{{content.videoId.description}}</div>'+
                                            '<span style="bottom:20px;left:10px;position:absolute">Views : {{content.videoId.view_count}}</span>'+
                                        '</div>'+
                                    '</span>'+
                                '</div>'+
                                '<span id="post_time">'+
                                    '<span id="respond_post">'+
                                        '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}'+
                                    '</span>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></spa>'+
                                '</span>'+
                            '</div>'+
                        '</div>';
    var articleTemplate = '<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="#">'  +
                                            '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.articleId.content}}</br></br>'  +
                                        '<div>' +
                                            '<span>by<a href="#"> {{content.uploader.user.name}}</a></span>'  +                                            
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">'+
                                            '<span id="respond_post">'+
                                                '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                                '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                            '</span>'+
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></spa>'+
                                    '</span>'   +                                    
                                '</div>'    +
                            '</div>';
    var eventClubTemplate ='<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="/event">'  +
                                            '<span id="event_post_heading">{{content.eventId.name}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.eventId.description}}</br></br>'  +
                                        '<div>' +
                                            '<p>by<a href="#"> {{content.uploader.club.name}}</a></p>'  +
                                            '<span id="respond_post" ng-hide="likingName" ng-click="like(content.eventId._id)">'  +
                                                '<a href="#">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Like'  +
                                                '</a>'  +
                                            '</span>'   +
                                            '<span id="respond_post" ng-show="likingName" ng-click="unlike(content.eventId._id)">'    +
                                                '<a href="#"><img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{content.like.length}} Unlike</a>'    +
                                            '</span>'   +
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">{{content.createdOn}}</span>'   +
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
                                            '<span>by<a href="#"> {{content.uploader.club.name}}</a></span>'  +                                            
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">'+
                                            '<span id="respond_post">'+
                                                '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                                '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                            '</span>'+
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></spa>'+
                                    '</span>'   +                                    
                                '</div>'    +
                            '</div>';                      
    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 2:
                template = imageTemplate;
                break;
            case 12:
                template = imageTemplate;
                break;
            case 3:
                template = videoTemplate;
                break;
            case 13:
                template = videoTemplate;
                break;
            case 1:
                template = articleTemplate;
                break;
            case 11:
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
            case 7:
                template = eventClubTemplate;
                break;
            case 71:
                template = articleClubTemplate;
                break;
        }
        
        return template;
    }

    

    var linker = function(scope, element, attrs, controller) {

        element.html(getTemplate(scope.content.type)).show();

        $compile(element.contents())(scope);

       /* var date = scope.content.createdOn ;
            console.log(date);
          var d = date.getDate();
          var m = date.getMonth()+1;
          var y = date.getFullYear();
          var min="0" + date.getMinutes();
          var h="0" + date.getHours();
          var s= "0" + date.getSeconds();
          scope.postTime=d+"-"+m+"-"+y+" "+h+":"+min;*/


        
        
           
            scope.one="one";
            scope.two="two";
            scope.three="three";
            scope.max = 5;
            var postIdRating=scope.content._id;
            var ratingName='rating'+postIdRating;
            $http.get('/api/posts/ratingInfo/'+postIdRating).success(function (response){
                scope.ratingName=response;
                console.log(scope.ratingName);
                scope.ratingHalf=scope.content.rating/2;
                var roundedRating=Math.round(scope.ratingHalf);
                
                if(roundedRating==scope.ratingHalf)
                {
                    scope.rate=roundedRating;
                }
                else if((roundedRating-scope.ratingHalf)>0)
                    scope.rate=roundedRating-1;
                else
                    scope.rate=roundedRating;                
                                 
            });

        

        scope.like = function(postId){
            $http.get('/api/posts/'+postId+'/like').success(function (response){
                console.log(response);
                var likingName='liking'+postId;
                scope.content.like.length=response;
                scope.likingName = true;
                
            });
        };

        function Ctrl2($scope, UploadPortalService) {
            $scope.prop2 = "Second";
            $scope.both = UploadPortalService.setProperty()
        }

        
        

        scope.unlike = function(postId){
            $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
                console.log(response);
                var likingName='liking'+postId;
                scope.content.like.length=response;
                scope.likingName = false;
                
            });
        };

         scope.blur =function(){
            scope.for_blur = {
                'filter': 'blur('+40+'px)'
            };
        };

        scope.viewVideo =function(vidurl){

            document.getElementById('for_blur').style.filter = 
            'blur(20px)';

          
            console.log(vidurl);
           
            var modalInstance = $modal.open({
              animation: true,
              templateUrl:'myModalVideo.html' ,
              controller: 'ModalInstanceCtrl',
              resolve: {
                  vidCode: function(){
                    return(vidurl);
                  },
                  videoPost: function(){
                    return scope.content;
                  },
                  ratingArray: function(){
                    return scope.ratingName;
                  }
                }
            });
        };

        
        

        scope.viewImage =function(imageId){
            document.getElementById('for_blur').style.filter = 
            'blur(20px)';

            
               scope.height=$(window).height();
                /*$("#img_viewed").css("height", "579px");
                alert(height);*/
                
            
            

             var modalInstance = $modal.open({
              animation: true,
              templateUrl:'myModalImage.html' ,
              controller: 'ModalImageInstanceCtrl',
              resolve: {
                  
                  image: function(){
                    return scope.content.imageId;
                  },
                  height:function(){
                    return scope.height;
                  }
                }
            });
    
        };

        scope.bookADay = function(postId){
            var modalInstance = $modal.open({
              animation: true,
              templateUrl:'myModalBookADay.html' ,
              controller: 'ModalBookADayInstanceCtrl',
              resolve: {
                  
                  bookingPostId: function(){
                    return postId;
                  }
                }
            });
        }
    }

    return {
        restrict: "E",
        link: linker,
        scope: {
            content:'='
        }
    };
});



angular.module('myAppApp').controller('ModalInstanceCtrl',function ($scope,$modalInstance,Auth,vidCode, videoPost,ratingArray,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
   $scope.user = Auth.getCurrentUser;
    console.log($scope.user().name);

  $scope.vidCode=vidCode;
 
    $scope.video = videoPost;


  $scope.ratingArray = ratingArray;
  $scope.rate=$scope.ratingArray.ratingValue;
  $scope.max = 10;
  $scope.rating=$scope.video.rating;
  $scope.votes=$scope.ratingArray.votes;

  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  }

  $scope.ratePost = function(rate) {
        $http.post('/api/posts/rating/'+$scope.video._id,{rating:rate}).success(function (response){
            $scope.votes=response.votes;
            $scope.rating=response.rating;
            console.log($scope.votes+$scope.rating);
  });
};

  /*$scope.rating1 = 5;
  $scope.rateFunction = function(rating) {
    console.log("Rating selected: " + rating);
    $http.post('/api/videos/ratings/'+$scope.vidCode,{rating:rating}).success(function (response){
      console.log(response);
      $scope.rating1 = rating;
    })
  };*/

  //////  Comment Functions ////////////////
   $scope.toggleVal = false;

  $scope.submitComment = function (){
      if($scope.commentData===undefined){

      }
      else {
        console.log($scope.commentData);
        $http.post('/api/comments/',{commentData:$scope.commentData,postId:$scope.video._id}).success(function (response){
          $scope.commentData='';
          console.log(response);
          refresh();
        });
      }
    }

    $scope.delete = function (id){
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        refresh();
      });
    }
    $scope.edit = function (id,editData){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log('the edited document is '+response);
        refresh();
      });
    }

    /////////// comment functions close////////////

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('myAppApp').controller('ModalImageInstanceCtrl',function ($scope,$modalInstance,image,height,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
    $scope.image=image;  
    $scope.img_viewed = {
        'height': getHeight()+"px"
    };

   
    
    $scope.img_viewed_info = {
        'width': getWidth()+"px"
    };

    function getHeight() {
            return (window.innerHeight * .90);
        }
    function getWidth() {
            return (100);
        }
    
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('myAppApp').controller('ModalBookADayInstanceCtrl',function ($scope,$modalInstance,bookingPostId,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
    $scope.postId=bookingPostId;  

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var dateTdy;

    $scope.today = function() {
    dateTdy= new Date();

    var d = dateTdy.getDate();
    var m = dateTdy.getMonth()+1;
    var y = dateTdy.getFullYear();
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"]
    $scope.dtNumeric=d+"-"+m+"-"+y;
    $scope.dt=d+"-"+month[m-1]+"-"+y;
    $scope.dt2=$scope.dt;
  };
  $scope.today();

    $scope.bookPost=function(){
        if($scope.dt2!=$scope.dt)
        {
          var date = $scope.dt ;
          var dd = date.getDate();
          var mm = date.getMonth()+1;
          var yy = date.getFullYear();
          var bookingDate=dd+"-"+mm+"-"+yy;
        }
        else
            var bookingDate=$scope.dtNumeric;

      
       $http.post('/api/bookings/'+$scope.postId,{bookingDate:bookingDate}).success(function (response){
        console.log(booked);
      })
     
    };

    $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.openED = function($event) {    //OpenEndDate
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedED = true;
  };
  $scope.openSD = function($event) {    //OpenStart Date
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedSD = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i=0;i<$scope.events.length;i++){
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});