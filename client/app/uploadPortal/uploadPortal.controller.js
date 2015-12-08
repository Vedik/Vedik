//global variable
var ranX, ranY=0,attendArray=[],likeArray=[];

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
                            '<div class="post_div thumbs_wrap" style="width:{{width}}%">'+
                                '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                    '<img src="{{content.imageId.picUrl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;">'+
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
                                    '<div class="dropdown">'+
                                        '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                        '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'+
                            '</div>'+                            
                        '</div>';
    var videoTemplate = '<div  ng-click=blur()>' +
                            '<div class="post_div thumbs_wrap" style="width:{{width}}%">'+
                               '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    '<img src="{{content.videoId.posterurl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;">'+
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
                                    '<div class="dropdown">'+
                                        '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                        '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Delete</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                '</span>'+
                            '</div>'+
                        '</div>';
    var articleTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
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
                                            '<div class="dropdown">'+
                                                '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                      
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+  
                                                '</ul>'+
                                            '</div>'+
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'   +                                    
                                '</div>'    +
                            '</div>';
    var eventClubTemplate ='<div class="post_div thumbs_wrap col-md-12">'+
                                    '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12">'+
                                     '  <img src="{{content.imageId.picUrl}}" id="img_post">'+
                                      '  <span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;"></span>'+
                                      '  <span id="img_name">{{content.eventId.name}}</span>'+
                                            '<span class="thumb_trnsprnt">'+
                                             '</span>'+
                                                     
                                    '</div>'+
                                    '<div class="col-md-12 text_type_post" id="event_det">'+
                                        '<a href="/event/{{content.eventId._id}}"><span id="event_post_heading">{{content.eventId.name}}</span></a>'+
                                        '<br/>'+
                                        '<span class="col-md-9">'+
                                            '<a href="/club/{{content.uploaderClub._id}}">{{content.uploaderClub.name}}</a>'+
                                            '<span class="colorg sizeten lh20">'+
                                                '<br/><span class="glyphicon glyphicon-time"> {{content.eventId.startDate}} </span>'+
                                                '<span class="glyphicon glyphicon-map-marker">{{content.eventId.location}} </span>'+
                                                '<br> {{content.eventId.description}} '+
                                            '</span>'+
                                        '</span>'+
                                        '<div class="col-md-3 ">'+
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
                                                '<a href="#">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                                '</a>'  +
                                            '</span>'   +
                                           
                                        '</span>'+
                                        '<div class="dropdown">'+
                                            '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                            '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Delete</a></li>'+
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                            '</ul>'+
                                        '</div>'+
                                        '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'+
                                    
                                
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
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'   +                                    
                                '</div>'    +
                            '</div>';
    var postBTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="text_type_post" id="article">' +
                                        '<a href="#">'  +
                                            '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.articleId.description}}</br></br>'  +
                                        '<div>' +
                                            '<span>by<a href="#"> {{content.uploader.user.name}}</a></span>'  +                                            
                                        '</div>'    +
                                    '</div>'    +
                                    '<span id="post_time">'+
                                            
                                             '<span id="respond_post"  ng-click="likey(content._id)">'  +
                                                '<a href="#">'   +
                                                    '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                                '</a>'  +
                                            '</span>'   +
                                                
                                           
                                            '<div class="dropdown">'+
                                                '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                                '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="deletePost(content._id)" class="w2b">Delete</a></li>'+
                                                      
                                                      '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" ng-click="addHOF(content._id)" class="w2b">+HOF</a></li>'+  
                                                '</ul>'+
                                            '</div>'+
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'   +                                    
                                '</div>'    +
                            '</div>';
    var imageBTemplate = '<div>'+
                            '<div class="post_div thumbs_wrap" style="width:{{width}}%">'+
                                '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                    '<img src="{{content.imageId.picUrl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;">'+
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
                                        '<a href="#">'   +
                                            '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                        '</a>'  +
                                    '</span>'   +
                                    '<div class="dropdown">'+
                                        '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                        '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'+
                            '</div>'+                            
                        '</div>';
    var videoBTemplate = '<div  ng-click=blur()>' +
                            '<div class="post_div thumbs_wrap" style="width:{{width}}%">'+
                               '<div class="img_div_wrap thumbs_wrap thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    '<img src="{{content.videoId.posterurl}}" id="img_post">'+
                                    '<span>'+
                                        '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;">'+
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
                                        '<a href="#">'   +
                                            '<img src="{{content.articleId.picUrl}}" width="20px" height="20px"> {{likeNum}} {{like}}'  +
                                        '</a>'  +
                                    '</span>'   +
                                    '<div class="dropdown">'+
                                        '<button type="button" class="g2b float_right dropdown-toggle" id="post_edit" data-toggle="dropdown"><span class="glyphicon glyphicon-chevron-down"></span></button>'+
                                        '<ul class="dropdown-menu box_shadow_dwn" role="menu" aria-labelledby="post_edit">'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Edit</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b">Delete</a></li>'+
                                              '<li role="presentation"><a role="menuitem" tabindex="-1" href="#" class="w2b" ng-click="addHOF(content._id)">+HOF</a></li>'+
                                        '</ul>'+
                                    '</div>'+
                                    '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                '</span>'+
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
                template = articleClubTemplate;
                break;
            case 22:
                template = imageTemplate;
                break;
            case 23:
                template = videoTemplate;
                break;
            case 42:
                template = eventClubTemplate;
                break;
            case 31:
                template = postBTemplate;
                break;
            case 32:
                template = imageBTemplate;
                break;
            case 33:
                template = videoBTemplate;
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
          if(scope.random)
          {
                if(ranY==1){
                scope.width=50;
                ranY=0;
               // console.log(ranX,ranY,50);
                }
                else{

                    ranX= Math.floor((Math.random() * 100) + 1);
                    var data=(ranX)/2;
                    if (data === parseInt(data, 10))
                    {
                        scope.width=50;
                        ranY=1;
                        console.log(ranX,ranY,50);
                    }   
                    else
                    {
                        scope.width=100;
                        ranY=0; 
                        //console.log(ranX,ranY,100);
                    }
            }
          }
          else
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
            
            if(scope.content.type==42 || scope.content.type==32 || scope.content.type==31 || scope.content.type==33)
            {
                console.log('hereasaaaa');
                var postIdLike=scope.content._id;
                
                $http.get('/api/posts/likeInfo/'+postIdLike).success(function (response){
                    likeArray[scope.index]={liking:response,num:scope.content.like.length};
                    scope.likeNum=likeArray[scope.index].num;
                    console.log(likeArray);
                    
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

        function Ctrl2($scope, UploadPortalService) {
            $scope.prop2 = "Second";
            $scope.both = UploadPortalService.setProperty()
        }

        scope.deletePost = function(postId){
            $http.delete('/api/posts/'+postId).success(function(response){
                console.log('Deleted');
            })
        }

        scope.addHOF = function(postId){
            $http.post('/api/users/addHOF/'+postId).success(function(response){
                console.log('added');
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
            random:'=',
            index:'='
        }
    };
})

.directive('contentNotif', function ($compile, $http,$modal) {
    var imageTemplate = '<div>'+
                            '<div class="notif_div thumbs_wrap col-md-12">'+
                                '<div class="notif_div_wrap thumbs_wrap thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                    '<img src="{{content.imageId.picUrl}}" id="img_post">'+
                                    '<span>'+
                                    '</span>'+
                                    '<span id="img_name">{{content.imageId.imgName}}</span>'+
                                    '<span class="thumb_trnsprnt"></span>'+
                                    '<span id="user_art_info">'+
                                        '<div id="a">'+
                                            '<div id="vid_data">div>'+
                                            '<span style="bottom:20px;left:10px;position:absolute">Views : {{content.imageId.view_count}}</span>'+
                                        '</div>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+                            
                        '</div>';
    var videoTemplate = '<div  ng-click=blur()>' +
                            '<div class="notif_div thumbs_wrap col-md-12" >'+
                               '<div class="notif_div_wrap thumbs_wrap thumbs_in col-md-12"  ng-click="viewVideo(content.videoId.vidurl)" >'+
                                    '<img src="{{content.videoId.posterurl}}" id="img_post">'+
                                    '<span>'+
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
                            '</div>'+
                        '</div>';
    var articleTemplate = '<div>'   +
                                '<div class="notif_div col-md-12">'  +
                                    '<div class="text_type_notif" id="article">' +
                                        '<a href="#">'  +
                                            '<span id="event_post_heading">{{content.articleId.articleName}}</span>'    +
                                        '</a>'  +
                                        '</br>{{content.articleId.content}}</br>'  +
                                        '<div>' +
                                            '<span>by<a href="#"> {{content.uploader.user.name}}</a></span>'  +                                            
                                        '</div>'    +
                                    '</div>'    +
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
                                            'by<a href="#"> {{content.uploader.club.name}}</a>'  +
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
                                            '<span ng-click="bookADay(content._id)" class="float_right"><a href="#">Book A Day</a></span>'+
                                    '</span>'   +                                    
                                '</div>'    +
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
                template = articleClubTemplate;
                break;
            case 22:
                template = imageTemplate;
                break;
            case 23:
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
          var bookingDate=dd+"-"+mm+"-"+yy;
        }
        else
            var bookingDate=$scope.dtNumeric;

      
       $http.post('/api/bookings/'+$scope.postId,{bookingDate:bookingDate}).success(function (response){
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

