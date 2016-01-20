//global variable
var ranX, ranY=0,attendArray=[],likeArray=[],userId,id;

'use strict';


angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http, UploadPortalService,User) {
    $scope.message = 'Hello';
    $scope.submitted = false;
    $scope.user = Auth.getCurrentUser;
   

  
  

     /*$http.get('/api/bookings/').success(function (response){
        console.log(response);
        $scope.bookings = response;
        console.log($scope.bookings);
    });*/
    
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



    $scope.creditsRadio="team";$scope.creditsRadioB=true;

    $scope.creditType=[];
      $scope.creditUser=[];
    $scope.creditType[0]='';
      $scope.creditUser[0]=[];
    
    var creditNum=0;
    $scope.addCredit= function (){
      console.log($scope.creditType);
     
      creditNum++;
      console.log(creditNum);
      $scope.creditType[creditNum]='';
      $scope.creditUser[creditNum]=[];
    }

    $scope.getSuggestionsForNames = function (query){
      return $http.get('/api/users/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    };

    $scope.getSuggestionsForCredits = function (query){
      return $http.get('/api/creditDets/search/'+query).success(function (response) {
        console.log(response);

        return response;
      });
    };

   $scope.creditsSubmit = function (){
      console.log($scope.creditType,$scope.creditUser);
   }

    $scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;

      });

    };

    $scope.loadCredit = function(query) {
        console.log('sa');
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
          return response.data;

      });

    };

    $scope.searchText    = null;
    $scope.querySearch   = querySearch;

   function querySearch (query,index) {
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
              
              return response.data;
            });
    }


   /*$scope.getVideoDetails = function (videoId){
      console.log(videoId);
      var a = videoId.split('watch?v=');
      if(a[1])
      {
        var video_id='HfLZnE3fIyI';
        var key='AIzaSyChm_agHP2KpiAIaoN8-s7EvnOxYeOSthQ';

        /*$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+video_id+'&key='+key+'&part=snippet',function(data,status,xhr){
            alert(data);
            // data contains the JSON-Object below
        });
        $http.get('https://www.googleapis.com/youtube/v3/videos?id='+video_id+'&key='+key+'&part=snippet').success(function (response){
          console.log(response);
        })
      }
   }*/
   $scope.type=11;

   $scope.setType= function(type){
      if(type==1){
          $scope.type=11;

      }
      else if(type==2){
          $scope.type=12;
      }
      else if(type==3){
          $scope.type=13;
      }
      
   }
   $scope.submitted=false;
   $scope.postSubmit = function (form){
    $scope.submitted=true;
    console.log(form,form.$valid);

    if($scope.creditsRadio=='team' && form.$valid){
        console.log("yo");
      if($scope.type==11){
           $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
            console.log(response);
            $scope.form={};            
            $('#uploadAnimate').addClass("animated  zoomOut ").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                $('#uploadAnimate').css("display","none").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',function(){
                       
                         $('postCreated').addClass("animated fadeIn");
                    });
            });
           
        })
      }
      else if($scope.type==12){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
      }
      else if($scope.type==13){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
    }
    else if($scope.creditsRadio=='me' && form.$valid){
        console.log(form.userCredits,$scope.creditTo,form.club);
         if($scope.type==11){
           $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
      else if($scope.type==12){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
      }
      else if($scope.type==13){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
    }
     
          
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
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="  thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                        '<img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.imageId.imgName}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploader.user.name}}</span>'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                            '<div id="a">'+
                                                '<span style="bottom:20px;left:10px;position:absolute"></span>'+
                                            '</div>'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.imageId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var videoTemplate=  '<div  ng-click=blur()>' +
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                   '<div class="  thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                        '<img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.videoId.vidname}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploader.user.name}} </span>'+
                                        '</span>'+
                                        '<span class="play">'+
                                            '<img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">'+
                                        '</span>'+
                                        '<span >'+
                                            '<img src="assets/images/copyright.png" class="CRicon">'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.videoId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    var articleTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                            '</a>'  +
                                            '</br>{{content.articleId.content}}</br></br>'  +
                                            '<div>' +
                                                '<span>by<a href=""> {{content.uploader.user.name}}</a></span>'  +                                            
                                            '</div>'    +
                                        '</div>'    +
                                        '<span id="post_time">'+
                                                '<span id="respond_post">'+
                                                    '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                                    '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                    '{{postTime}}'+
                                                '</span>'+
                                                '<div class="dropdown animated">'+
                                                    '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                    '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                          
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+ 
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+ 
                                                    '</ul>'+
                                                '</div>'+
                                                '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                        '</span>'   +   
                                    '</div>'+                                 
                                '</div>'    +
                            '</div>';
    var imageClubTemplate = '<div>'+
                            '<div class="post_div" style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn col-md-12">'+
                                    '<div class=" thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                        '<img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative" >'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="img_post"  >'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.imageId.imgName}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploaderClub.name}}</span>'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                            '<div id="a">'+
                                                '<span style="bottom:20px;left:10px;position:absolute"></span>'+
                                            '</div>'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.imageId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated slideInLeft">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+                                            
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var videoClubTemplate=  '<div  >' +
                            '<div class="post_div" style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn col-md-12">'+
                                   '<div class="  thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                        '<img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.videoId.vidname}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploaderClub.name}} </span>'+
                                        '</span>'+
                                        '<span class="play">'+
                                            '<img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">'+
                                        '</span>'+
                                        '<span >'+
                                            '<img src="assets/images/copyright.png" class="CRicon">'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.videoId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    var articleClubTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                            '</a>'  +
                                            '</br>{{content.articleId.content}}</br></br>'  +
                                            '<div>' +
                                                '<span>by<a href=""> {{content.uploaderClub.name}}</a></span>'  +                                            
                                            '</div>'    +
                                        '</div>'    +
                                        '<span id="post_time">'+
                                                '<span id="respond_post">'+
                                                    '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                                    '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                    '{{postTime}}'+
                                                '</span>'+
                                                '<div class="dropdown animated">'+
                                                    '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                    '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+  
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="editBooking(content._id)" class="w2b">Edit Booking(s)</a></li>'+  
                                                    '</ul>'+
                                                '</div>'+
                                                '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                        '</span>'   +   
                                    '</div>'+                                 
                                '</div>'    +
                            '</div>';
    var imageTeamTemplate = '<div>'+
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="  thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                        '<img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.imageId.imgName}}'+                                    
                                            '<span style="font-size:12px"> by {{content.team}}</span>'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                            '<div id="a">'+
                                                '<span style="bottom:20px;left:10px;position:absolute"></span>'+
                                            '</div>'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.imageId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var videoTeamTemplate=  '<div  ng-click=blur()>' +
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                   '<div class="  thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                        '<img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.videoId.vidname}}'+                                    
                                            '<span style="font-size:12px"> by {{content.team}} </span>'+
                                        '</span>'+
                                        '<span class="play">'+
                                            '<img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">'+
                                        '</span>'+
                                        '<span >'+
                                            '<img src="assets/images/copyright.png" class="CRicon">'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.videoId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                            '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                '{{postTime}}'+
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>';
    var articleTeamTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                            '</a>'  +
                                            '</br>{{content.articleId.content}}</br></br>'  +
                                            '<div>' +
                                                '<span>by<a href=""> {{content.team}}</a></span>'  +                                            
                                            '</div>'    +
                                        '</div>'    +
                                        '<span id="post_time">'+
                                                '<span id="respond_post">'+
                                                    '<rating ng-model="rate" max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                                    '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                                    '{{postTime}}'+
                                                '</span>'+
                                                '<div class="dropdown animated">'+
                                                    '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                    '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+  
                                                    '</ul>'+
                                                '</div>'+
                                                '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                        '</span>'   +   
                                    '</div>'+                                 
                                '</div>'    +
                            '</div>';
    var imageBTemplate ='<div class="post_div   col-md-12">'+
                                    '<div class="  thumbs_in col-md-12">'+
                                     '  <img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative">'+
                                      '  <span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="img_post"></span>'+
                                      '  <span id="img_name">{{content.eventId.name}}</span>'+
                                            '<span class="thumb_trnsprnt">'+
                                             '</span>'+
                                                     
                                    '</div>'+
                                    '<div class="col-md-12 text_type_post" id="event_det">'+
                                        '<a href="/event/{{content.eventId._id}}"><span id="event_post_heading">{{content.eventId.name}}</span></a>'+
                                        '<br/>'+
                                        '<span class="col-md-8">'+
                                            '<a href="/club/{{content.uploaderClub._id}}">{{content.uploaderClub.name}}</a>'+
                                            '<span class="colorg sizeten lh20">'+
                                                '<br/><span class="glyphicon glyphicon-time"> {{content.eventId.startDate}} </span>'+
                                                '<span class="glyphicon glyphicon-map-marker">{{content.eventId.location}} </span>'+
                                                '<br> {{content.eventId.description}} '+
                                            '</span>'+
                                        '</span>'+
                                        '<div class="col-md-4 ">'+
                                            '<p class="list_heading centric lh15 cursor" ng-click="attending()">'+
                                                '{{attend}}'+
                                                '<br><span class="colorg sizeten ">{{attendNum}} said going</span>'+
                                            '</p>'+
                                        '</div>  '+
                                        '<br><br><br>'+
                                        
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.videoId.description}}</div>'+
                                        '<span id="respond_post">'+
                                            '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                                '<a href="">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                                '</a>'  +
                                            '</span>'   +
                                           
                                        '</span>'+
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                    
                                
                                '</div>';
    var articleBTemplate ='<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                            '</a>'  +
                                            '</br>{{content.articleId.content}}</br></br>'  +
                                            '<div>' +
                                                '<span>by<a href=""> {{content.uploader.club.name}}</a></span>'  +                                            
                                            '</div>'    +
                                        '</div>'    +
                                        '<span id="post_time">'+
                                                '<span id="respond_post">'+
                                                    '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                                        '<a href="">'   +
                                                            '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                                        '</a>'  +
                                                    '</span>'   +
                                                '</span>'+
                                                '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                        '</span>'   +
                                    '</div>'+                                    
                                '</div>'    +
                            '</div>';
    var postAnnTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                            '</a>'  +
                                            '</br>{{content.articleId.description}}</br></br>'  +
                                            '<div>' +
                                                '<span>by<a href=""> {{content.uploaderClub.name}}</a></span>'  +                                            
                                            '</div>'    +
                                        '</div>'    +
                                        '<span id="post_time">'+
                                                
                                                 '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                                    '<a href="">'   +
                                                        '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                                    '</a>'  +
                                                '</span>'   +
                                                    
                                               
                                                '<div class="dropdown animated">'+
                                                    '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                    '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                          
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+ 
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+ 
                                                    '</ul>'+
                                                '</div>'+
                                                '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                        '</span>'   + 
                                    '</div>'+                                   
                                '</div>'    +
                            '</div>';
    var imageAnnTemplate = '<div>'+
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="  thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                        '<img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.imageId.imgName}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploader.user.name}}</span>'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                            '<div id="a">'+
                                                '<span style="bottom:20px;left:10px;position:absolute"></span>'+
                                            '</div>'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.imageId.description}}</div>'+
                                         '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                            '<a href="">'   +
                                                '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                            '</a>'  +
                                        '</span>'   +
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var videoAnnTemplate = '<div  ng-click=blur()>' +
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                   '<div class="  thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                        '<img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="img_post">'+
                                        '</span>'+
                                        '<span id="img_name">'+
                                            '{{content.videoId.vidname}}'+                                    
                                            '<span style="font-size:12px"> by {{content.uploader.user.name}} </span>'+
                                        '</span>'+
                                        '<span class="play">'+
                                            '<img src="http://clipartsy.com/openclipart.org/2013/October13/play_button-1969px.png">'+
                                        '</span>'+
                                        '<span >'+
                                            '<img src="assets/images/copyright.png" class="CRicon">'+
                                        '</span>'+
                                        '<span class="thumb_trnsprnt"></span>'+
                                        '<span id="user_art_info">'+
                                        '</span>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<div style="padding:10px 0px;color:black">{{content.videoId.description}}</div>'+
                                         '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                            '<a href="">'   +
                                                '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                            '</a>'  +
                                        '</span>'   +
                                        '<div class="dropdown animated">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                                          '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="unbook(content._id,$index)" ng-show="booking">Unbook</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="">Book A Day</a></span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</div>'; 
    var winningTemplate =   '<div class="post_div col-md-12">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="Ellipse_1"></div>'+
                                    '<div class="text_type_post" id="article">'+
                                        '<a href=""><span id="award_heading"><img alt="{{ content.uploaderClub.proPic }}" ng-src="http://c15179525.r25.cf2.rackcdn.com/8136545_0_2b0a2099be3b06c2896418e30bb2f461.jpg" class="md-avatar" /> {{content.uploaderClub.name}}</span></a><span  id="light"> awards </span><a href=""><span  id="award_heading"><img alt="{{  }}" ng-src="{{content.uploader.user.proPic}}" class="md-avatar" /> {{content.uploader.user.name}}</span></a>'+
                                        
                                        '<div id="light"> {{content.eventId.name}} </div>'+
                                        
                                        '<div id="bold" >'+ 
                                            '{{content.uploader.user.name}}<span id="light"> has been awarded </span>'+
                                            '{{content.position}}<span id="light"> in </span>'+
                                            '{{content.eventId.name}}<span id="light"> by </span>'+
                                            '{{content.uploaderClub.name}}<span id="light"> conducted on Date.</span>'+                    
                                        '</div>'+
                                        '<div class="ardecode"><a href=""> Congratulations {{content.uploader.user.name}}</a></div>'+
                                    '</div>'+
                                    '<span id="post_time">'+
                                        '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                            '<a href="">'   +
                                                '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                            '</a>'  +
                                        '</span>'   +
                                        '<div class="dropdown animated">'+
                                            '<button aria-expanded="false" aria-haspopup="true" type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b">Edit</a></li>'+
                                                '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                '<li role="presentation"><a role="menuitem" tabindex="-1" href="" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        
                                    '</span>'+
                                '</div>'+
                            '</div>  ';

    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 121:                        //User posts
                template = imageTemplate;
                break;
            case 131:
                template = videoTemplate;
                break;
            case 111:
                template = articleTemplate;
                break;
            case 122:                        //User posts
                template = imageClubTemplate;
                break;
            case 132:
                template = videoClubTemplate;
                break;
            case 112:
                template = articleClubTemplate;
                break;
            case 123:                        //User posts
                template = imageTeamTemplate;
                break;
            case 133:
                template = videoTeamTemplate;
                break;
            case 113:
                template = articleTeamTemplate;
                break;
            case 21:                        //club annouce
                template = postAnnTemplate;
                break;
            case 22:
                template = imageAnnTemplate;
                break;
            case 23:
                template = videoAnnTemplate;
                break;
            case 31:                        //event annouce
                template = postAnnTemplate;
                break;
            case 32:
                template = imageAnnTemplate;
                break;
            case 33:
                template = videoAnnTemplate;
                break; 
            case 42:
                template = imageBTemplate;
                break; 
            case 50:
                template=winningTemplate;
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
          // if(scope.random)
          // {
          //       if(ranY==1){
          //       scope.width=50;
          //       ranY=0;
          //      // console.log(ranX,ranY,50);
          //       }
          //       else{

          //           ranX= Math.floor((Math.random() * 100) + 1);
          //           var data=(ranX)/2;
          //           if (data === parseInt(data, 10))
          //           {
          //               scope.width=50;
          //               ranY=1;
          //               console.log(ranX,ranY,50);
          //           }   
          //           else
          //           {
          //               scope.width=100;
          //               ranY=0; 
          //               //console.log(ranX,ranY,100);
          //           }
          //   }
          // }
          // else
          //    scope.width=100;
            scope.width=100;
            
            
                
         
           
            scope.one="one";
            scope.two="two";
            scope.three="three";
            scope.max = 5;
            var postIdRating=scope.content._id;
            var ratingName='rating'+postIdRating;
            $http.get('/api/posts/ratingInfo/'+postIdRating).success(function (response){
                scope.ratingName=response;
                //console.log(scope.ratingName);
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

        // scope.attendArray=angular.copy(attendArray);
         
            if(scope.content.type==42 )
            {
                var id = scope.content.eventId._id;

                var eventAttend=id;
                console.log(eventAttend);
                $http.get('/api/events/attendInfo/'+id).success(function (response){
                    attendArray[scope.index]={eventAttend:response,num:scope.content.eventId.attending.length};
                    // console.log(scope.eventAttend);
                    
                    // attendArray[scope.index]={;
                    scope.attendNum=attendArray[scope.index].num;
                    console.log(attendArray);
                    if(attendArray[scope.index].eventAttend)
                    {
                        scope.attend="Attending";
                    }
                    else{
                        scope.attend="Attend";
                    }
                });
            }
        
        
            scope.attending = function (index){
                
               var id=scope.content.eventId._id; 
               console.log(attendArray);
               if(attendArray[scope.index].eventAttend){
                    $http.delete('/api/events/attend/'+id).success(function (response){
                      attendArray[scope.index]={eventAttend:false,num:response};
                      // attendArray[scope.index]=response;
                      console.log(response);
                      scope.attendNum=attendArray[scope.index].num;
                      scope.attend="Attend";
                      console.log(attendArray);
                  })
               }  
               else{
                    $http.post('/api/events/attend/'+id).success(function (response){
                      attendArray[scope.index]={eventAttend:true,num:response};
                     // attendArray[scope.index]=response;
                      console.log(response);
                      scope.attendNum=attendArray[scope.index].num;
                      scope.attend="Attending";
                      console.log(attendArray);
                  })
               } 

                  
            }
            
            if(scope.content.type<100)
            {
                console.log('hereasaaaa');
                var postIdLike=scope.content._id;
                
                $http.get('/api/posts/likeInfo/'+postIdLike).success(function (response){
                    likeArray[scope.index]={liking:response,num:scope.content.like.length};
                    scope.likeNum=likeArray[scope.index].num;
                  
                    
                    if(response){
                        scope.like="| You Like";
                    }
                    else
                        scope.like="Like";
                });
            }
        scope.likey = function(postId){
            if(likeArray[scope.index].liking)
            {
                $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
                    console.log(response);
                    likeArray[scope.index]={liking:false,num:response};
                    scope.likeNum=likeArray[scope.index].num;
                    scope.like="Like";
                
                });
            }
            else
            {
                $http.get('/api/posts/'+postId+'/like').success(function (response){
                    console.log(response);
                    likeArray[scope.index]={liking:true,num:response};
                    scope.likeNum=likeArray[scope.index].num;
                    scope.like="| You Like";
                    
                    
                });
            }
            
        };



        scope.unbook = function(postId,index){
            $http.delete('/api/bookings/'+postId).success(function(response){
                console.log('Deleted');
            })
        }

        scope.deletePost = function(postId){
            $http.delete('/api/posts/'+postId).success(function(response){
                console.log(response);
            })
        }

        scope.addHOF = function(postId){
            $http.post('/api/users/addHOF/'+postId).success(function(response){
                console.log('added');
            })
        }
         scope.editBooking = function(postId){
            $http.get('/api/bookings/post/'+postId).success(function(response){
                console.log(response);
            })
        }
        
       
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
              controller: 'ModalVideoInstanceCtrl',
              backdropClass:'modalbackdrop',
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
                  
                  imagePost: function(){
                    return scope.content;
                  },
                  height:function(){
                    return scope.height;
                  },
                  ratingArray: function(){
                    return scope.ratingName;
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
            content:'=',
            booking:'=',
            index:'='
        }
    };
})

.directive('contentNotif', function ($compile, $http,$modal,User,Auth) {
    var imageTemplate = '<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+
                                    // '<div class="center-cropped"'+ 
                                    //      'style="background-image: url({{content.imageId.picUrl}});">'+
                                    // '</div>'+
                                   
                                                                        
                                    '<div id="notif_name" >'+ 
                                        '{{content.uploader.user.name}}<span id="notif_uploader"> has added a new Image </span>'+
                                        '"{{content.imageId.imgName}}"<span id="notif_uploader"> to his work</span>'+
                                        
                                    '</div>'+

                                        '<br/><span id="notif_desc">'+
                                            '<img class="notif_icon" src="http://icons.iconarchive.com/icons/martz90/circle/512/camera-icon.png">'+
                                            '"{{content.imageId.description}}"'+
                                        '<br/><span ng-show="!review"><rating ng-model="rate"  max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}</span><span ng-show="review" class="colorlb">Waiting for you to review</span></span>'+
                                    
                                   
                                '</div>'+
                                 '<div class="col-md-4" id="notif_back"> <img src="{{content.imageId.picUrl}}" id="notif_img" ></div>'+
                            '</div>'+                            
                        '</div>';
    var videoTemplate = '<div  ng-click=blur()>' +
                            '<div class="notif_div   col-md-12" >'+

                               '<div class="notif_div_wrap    col-md-8"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    
                                    // '<div class="col-md-8" id="notif_back"><img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative"></div>'+
                                    // '<span>'+
                                    // '</span>'+
                                    '<div id="notif_name" >'+
                                        '{{content.uploader.user.name}}<span id="notif_uploader"> has added a new Video </span>'+
                                        '"{{content.videoId.vidname}}"<span id="notif_uploader"> to his work</span>'+
                                    '</div>'+
                                        '<br/><span id="notif_desc">'+
                                             '<img class="notif_icon" src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Play_blauw.png">'+
                                             '"{{content.videoId.description}}"'+
                                        '<br/><span ng-show="!review"><rating ng-model="rate"  max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}</span><span ng-show="review" class="colorlb">Waiting for you to review</span></span>'+
                                
                                    
                                    
                                '</div>'+
                                '<div class="col-md-4"  id="notif_back"><img src="{{content.videoId.posterurl}}" id="notif_img"></div>'+
                            '</div>'+
                        '</div>';
    var articleTemplate = '<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+                                                                        
                                    '<div id="notif_name" >'+ 
                                        '{{content.uploader.user.name}}<span id="notif_uploader"> has added a new Writing </span>'+
                                        '"{{content.articleId.articleName}}"<span id="notif_uploader"> to his work</span>'+
                                        
                                    '</div>'+

                                        '<br/><span id="notif_desc">'+
                                            '<img class="notif_icon" src="http://www.way2campus.net/images/image_01.png">'+
                                            '"{{content.articleId.description}}"'+
                                        '<br/><span ng-show="!review"><rating ng-model="rate"  max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}</span><span ng-show="review" class="colorlb">Waiting for you to review</span></span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var eventClubTemplate ='<div>'   +
                                '<div class="post_div col-md-12">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="/event">'  +
                                            '<span id="event_post_heading">{{content.eventId.name}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.eventId.description}}</br></br>'  +
                                        '<div>' +
                                            'by<a href=""> {{content.uploader.club.name}}</a>'  +
                                        '</div>'    +                                        
                                    '</div>'    +
                                    '<span id="post_time">{{content.createdOn}}</span>'   +
                                '</div>'    +
                            '</div>';
     var imageATemplate = '<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+
                                    // '<div class="center-cropped"'+ 
                                    //      'style="background-image: url({{content.imageId.picUrl}});">'+
                                    // '</div>'+
                                   
                                                                        
                                    '<div id="notif_name" >'+ 
                                        '{{content.uploader.user.name}}<span id="notif_uploader"> has added a new Image </span>'+
                                        '"{{content.imageId.imgName}}"<span id="notif_uploader"> to his work</span>'+
                                        
                                    '</div>'+

                                        '<br/><span id="notif_desc">'+
                                            '<img class="notif_icon" src="http://icons.iconarchive.com/icons/martz90/circle/512/camera-icon.png">'+
                                            '"{{content.imageId.description}}"'+
                                        '<br/><span ng-show="!review"><rating ng-model="rate"  max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}</span><span ng-show="review">Waiting for you to review</span></span>'+
                                    
                                   
                                '</div>'+
                                 '<div class="col-md-4" id="notif_back"> <img src="{{content.imageId.picUrl}}" id="notif_img" ></div>'+
                            '</div>'+                            
                        '</div>';
    var videoATemplate = '<div  ng-click=blur()>' +
                            '<div class="notif_div   col-md-12" >'+

                               '<div class="notif_div_wrap    col-md-8"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    
                                    // '<div class="col-md-8" id="notif_back"><img src="{{content.videoId.posterurl}}" id="img_post" style="position:relative"></div>'+
                                    // '<span>'+
                                    // '</span>'+
                                    '<div id="notif_name" >'+
                                        '{{content.uploader.user.name}}<span id="notif_uploader"> has added a new Video </span>'+
                                        '"{{content.videoId.vidname}}"<span id="notif_uploader"> to his work</span>'+
                                    '</div>'+
                                        '<br/><span id="notif_desc">'+
                                             '<img class="notif_icon" src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Play_blauw.png">'+
                                             '"{{content.videoId.description}}"'+
                                        '<br/><span ng-show="!review"><rating ng-model="rate"  max="max" readonly="true"  titles="[{{one}},{{two}},{{three}}]" ng-click="ratePost(rate)"></rating>'+
                                        '{{ratingHalf}} by {{ratingName.votes}} users '+  
                                            '{{postTime}}</span><span ng-show="review">Waiting for you to review</span></span>'+
                                
                                    
                                    
                                '</div>'+
                                '<div class="col-md-4"  id="notif_back"><img src="{{content.videoId.posterurl}}" id="notif_img"></div>'+
                            '</div>'+
                        '</div>';
    var articleATemplate ='<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+                                 
                                    '<div id="notif_name" >'+ 
                                        '{{content.uploadedClub.name}}<span id="notif_uploader"> made an announcement regarding </span>'+
                                        '"{{content.articleId.articleName}}"'+   
                                    '</div>'+
                                    '<br/><span id="notif_desc">'+
                                        '<img class="notif_icon" src="http://icons.iconarchive.com/icons/graphicloads/100-flat/256/announcement-icon.png">'+
                                        '"{{content.createdOn}}"'+
                                    '</span>'+
                                '</div>'+
                                 
                            '</div>'+                            
                        '</div>';
    var imageEATemplate = '<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+
                                    // '<div class="center-cropped"'+ 
                                    //      'style="background-image: url({{content.imageId.picUrl}});">'+
                                    // '</div>'+
                                   
                                                                        
                                    '<div id="notif_name" >'+ 
                                        '{{content.eventId.name}}<span id="notif_uploader"> made an announcement regarding </span>'+
                                        '"{{content.imageId.imgName}}"'+
                                        
                                    '</div>'+

                                        '<br/><span id="notif_desc">'+
                                            '<img class="notif_icon" src="http://icons.iconarchive.com/icons/martz90/circle/512/camera-icon.png">'+
                                            '"{{content.imageId.description}}"'+
                                        '</span>'+
                                    
                                   
                                '</div>'+
                                 '<div class="col-md-4" id="notif_back"> <img src="{{content.imageId.picUrl}}" id="notif_img" ></div>'+
                            '</div>'+                            
                        '</div>';
    var videoEATemplate = '<div  ng-click=blur()>' +
                            '<div class="notif_div   col-md-12" >'+

                               '<div class="notif_div_wrap    col-md-8"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    
                                
                                    '<div id="notif_name" >'+
                                        '{{content.eventId.name}}<span id="notif_uploader"> made an announcement regarding </span>'+
                                        '"{{content.videoId.vidname}}"'+
                                    '</div>'+
                                        '<br/><span id="notif_desc">'+
                                             '<img class="notif_icon" src="https://upload.wikimedia.org/wikipedia/commons/e/e8/Play_blauw.png">'+
                                             '"{{content.videoId.description}}"'+
                                        '</span>'+
                                
                                    
                                    
                                '</div>'+
                                '<div class="col-md-4"  id="notif_back"><img src="{{content.videoId.posterurl}}" id="notif_img"></div>'+
                            '</div>'+
                        '</div>';
    var articleEATemplate ='<div>'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" ng-click="viewImage(content.imageId._id)">'+                                 
                                    '<div id="notif_name" >'+ 
                                        '{{content.uploadedClub.name}}<span id="notif_uploader"> made an announcement regarding </span>'+
                                        '"{{content.articleId.articleName}}"'+   
                                    '</div>'+
                                    '<br/><span id="notif_desc">'+
                                        '<img class="notif_icon" src="http://icons.iconarchive.com/icons/graphicloads/100-flat/256/announcement-icon.png">'+
                                        '"{{content.createdOn}}"'+
                                    '</span>'+
                                '</div>'+
                                 
                            '</div>'+                            
                        '</div>';  
      var winningTemplate = '<div class="notif_div col-md-12" style="padding:5px 10px">'+
                              '<div class="Ellipse_1"></div>'+
                                '<div >'+
                                    '<div class="ardecode"><a href=""> Congratulations {{content.uploader.user.name}}</a></div>'+
                                    
                                    
                                    '<div id="bold" >'+ 
                                        'You<span id="light"> have been awarded </span>'+
                                        '{{content.position}}<span id="light"> in </span>'+
                                        '{{content.eventId.name}}<span id="light"> by </span>'+
                                        '{{content.uploaderClub.name}}<span id="light"> conducted on Date.</span>'+                    
                                    '</div>'+
                                    
                                '</div>'+
                                
                            '</div>  ';
     var creditConfirmationTemplate = '<div ng-click="confirmCredit(content.postId.articleId.articleName)">'+
                            '<div class="notif_div   col-md-12">'+
                                '<div class="notif_div_wrap    col-md-8" >'+                                                                        
                                    '<div id="notif_name">'+ 
                                        '{{content.postId.uploader.user.name}}<span id="notif_uploader"> added you in team </span>'+
                                        '"{{content.postId.team}}"<span id="notif_uploader"> for the Writing </span>'+
                                        '"{{content.postId.articleId.articleName}}"<span id="notif_uploader"> as </span>'+
                                        '<span ng-repeat="credit in credits" >{{credit.credit.creditDetail}} </span>'+
                                        
                                    '</div>'+

                                        '<br/><span id="notif_desc">'+
                                            '<img class="notif_icon" src="http://www.way2campus.net/images/image_01.png">'+
                                            'Click to agree/disagree'+
                                        '<br/>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';

    var getTemplate = function(contentType) {
        var template = '';

        switch(contentType) {
            case 12:
                template = imageTemplate;
                break;
            case 13:
                template = videoTemplate;
                break;
            case 11:
                template = articleTemplate;
                break;
            case 21:
                template = articleATemplate;
                break;
            case 22:
                template = imageATemplate;
                break;
            case 23:
                template = videoATemplate;
                break;
            case 50:
                template=winningTemplate;
                break;
            case 7:
                template = eventClubTemplate;
                break;
            case 91:
                template = creditConfirmationTemplate;
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


        
        
           
    if(scope.content.type<90){  
            scope.one="one";
            scope.two="two";
            scope.three="three";
            scope.max = 5;
            var postIdRating=scope.content._id;
            var ratingName='rating'+postIdRating;
            $http.get('/api/posts/ratingInfo/'+postIdRating).success(function (response){
                scope.ratingName=response;
                //console.log(scope.ratingName);
                if(scope.ratingName.votes<10){
                    scope.review=true;
                }
                
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
    }
        

        scope.like = function(postId){
            $http.get('/api/posts/'+postId+'/like').success(function (response){
                console.log(response);
                var likingName='liking'+postId;
                scope.content.like.length=response;
                scope.likingName = true;
                
            });
        };

       

        
        
        scope.user = Auth.getCurrentUser;
         userId= scope.user()._id;
        
        if(scope.content.type==91){
          $http.get('api/credits/credit/'+scope.content.postId._id+'/'+userId).success(function (response){
              scope.credits=angular.copy(response);
              console.log(scope.credits);
            
          })
        }
        

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
              controller: 'ModalVideoInstanceCtrl',
              backdropClass:'modalbackdrop',
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
                  
                  imagePost: function(){
                    return scope.content;
                  },
                  height:function(){
                    return scope.height;
                  },
                  ratingArray: function(){
                    return scope.ratingName;
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

        scope.confirmCredit =function(name){            
           
            var modalInstance = $modal.open({
              animation: true,
              templateUrl:'confirmCredit.html' ,
              controller: 'ConfirmCreditCtrl',
              resolve: {
                  postId: function(){
                    return scope.content.postId._id;
                  },
                  credits: function(){
                    return scope.credits;
                  },
                  name:function(){
                    return name;
                  }
                }
            });
        };
    }

    return {
        restrict: "E",
        link: linker,
        scope: {
            content:'='
        }
    };
})


.directive('enforceMaxTags', function() {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, ngCtrl) {
      var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;

      ngCtrl.$parsers.push(function(value) {
        if (value && maxTags && value.length > maxTags) {
          value.splice(value.length - 1, 1);
        }
        return value;
      });
    }
  };
});



angular.module('myAppApp').controller('ModalVideoInstanceCtrl',function ($scope,$modalInstance,Auth,vidCode, videoPost,ratingArray,$http,$document){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
   $scope.user = Auth.getCurrentUser;
    console.log($scope.user().name);

  $scope.vidCode=vidCode;
 
    $scope.video = videoPost;
    
    var comments=[];
    comments=angular.copy($scope.video.comments);
    $scope.comments=comments;

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

    $scope.isReadonly = false;

      if(!$scope.ratingArray.rating)
      {
        $scope.userRate=true;
      }
      else
      {
        $scope.userRate=false;
      }

  $scope.ratePost = function(rate) {
        $http.post('/api/posts/rating/'+$scope.video._id,{rating:rate}).success(function (response){
            $scope.votes=response.votes;
            $scope.rating=response.rating;
            $scope.userRate=false;
            console.log($scope.votes+$scope.rating);
  });
};
    
        $http.get('/api/credits/video/'+$scope.video._id).success(function(response){
            console.log(response);
            $scope.credit=response;
           
        });
    

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
          
          var length=comments.length;
          console.log(response,length);
          var comment=angular.copy(response);
          comments[length]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
        });
      }
    }

    $scope.delete = function (id){
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        comments.splice(index,1);
        console.log(comments);
        $scope.comments=comments;
        
      });
    }
    $scope.edit = function (id,editData,index){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log(response);
        var comment=angular.copy(response);
          comments[index]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
      });
    }

    /////////// comment functions close////////////
    $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });

  $scope.cancel = function () {
    console.log('clsing modal');
    $(document).ready(function() {

          
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        
    });
    
    $modalInstance.dismiss('cancel');

  };
});

angular.module('myAppApp').controller('ModalImageInstanceCtrl',function ($scope,$modalInstance,imagePost,ratingArray,height,$http,Auth){
  console.log('hello');
   $scope.ok = function () {
        $modalInstance.close($scope.selected.item);

    };
    $scope.image=imagePost;  
    $scope.img_viewed = {
        'height': getHeight()+"px"
    };

    var comments=[];
    comments=angular.copy($scope.image.comments);
    $scope.comments=comments;

    $scope.user = Auth.getCurrentUser;
    console.log($scope.user().name);
   
    $scope.ratingArray = ratingArray;
      $scope.rate=$scope.ratingArray.ratingValue;
      $scope.max = 10;
      $scope.rating=$scope.image.rating;
      $scope.votes=$scope.ratingArray.votes;

      $scope.isReadonly = false;

      if(!$scope.ratingArray.rating)
      {
        $scope.userRate=true;
      }
      else
      {
        $scope.userRate=false;
      }
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      }

      $scope.ratePost = function(rate) {
            $http.post('/api/posts/rating/'+$scope.image._id,{rating:rate}).success(function (response){
                $scope.votes=response.votes;
                $scope.rating=response.rating;
                $scope.userRate=false;
                console.log($scope.votes+$scope.rating+"sdfgbfbh"+$scope.userRate);
        });
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

    $http.get('/api/credits/video/'+$scope.image._id).success(function(response){
            console.log(response);
            $scope.credit=response;
           
        });

    $scope.submitComment = function (){
      if($scope.commentData===undefined){

      }
      else {
        console.log($scope.commentData);
        $http.post('/api/comments/',{commentData:$scope.commentData,postId:$scope.image._id}).success(function (response){
          $scope.commentData='';
          
           var length=comments.length;
          console.log(response,length);
          var comment=angular.copy(response);
          comments[length]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
        });
      }
    }

    $scope.delete = function (id,index){
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        
        
        
        comments.splice(index,1);
        console.log(comments);
        $scope.comments=comments;
        
      });
    }
    $scope.edit = function (id,editData,index){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log(response);
       
          var comment=angular.copy(response);
          comments[index]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
      });
    }


    $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });
        
      $scope.cancel = function () {
        $(document).ready(function() {
                $("#for_blur").css("filter", 'blur(0px)'); 
        });
        $modalInstance.dismiss('cancel');
      };
});

/*******************************Booking modal******************************************/

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
          var bookingDate=date;
        }
        else
          var bookingDate=dateTdy;
          bookingDate.setSeconds(0);
          bookingDate.setHours(0);
          bookingDate.setMinutes(0);
          var startDate=new Date(bookingDate.valueOf());
          startDate.setDate(startDate.getDate()-1);
          console.log(bookingDate,startDate,dateTdy);
           $http.post('/api/bookings/'+$scope.postId,{bookingDate:bookingDate,startDate:startDate}).success(function (response){
            console.log(booked);
          })
     
    };

     $scope.ok = function () {
        $modalInstance.close($scope.postId);
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

  $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('myAppApp').controller('ConfirmCreditCtrl',function ($scope,$modalInstance,postId,credits,name,$http){
  console.log('hello');
  
    $scope.name=name;
    $scope.credits=credits;
   


    $scope.confirmYes=function(){
        
      
        $http.put('/api/credits/confirm/'+postId,{confirm:true}).success(function(response){
            $modalInstance.dismiss('cancel');
        })
    };
    $scope.confirmNo=function(){
        
      
        $http.put('/api/credits/confirm/'+postId,{confirm:false}).success(function(response){
            $modalInstance.dismiss('cancel');
        })
    };

 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

