angular.module('myAppApp').directive('contentNotif', function ($compile, $http,$modal,User,Auth) {
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
         var userId= scope.user()._id;
        
        if(scope.content.type==91 && scope.content.postId){
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