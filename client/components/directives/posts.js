angular.module('myAppApp').directive('contentItem', function ($compile, $http,$modal) {
    var imageTemplate = '<div>'+
                            '<div class="post_div  " style="width:{{width}}%">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="  thumbs_in col-md-12" ng-click="viewImage(content.imageId._id)">'+
                                        '<img src="{{content.imageId.picUrl}}" id="img_post" style="position:relative">'+
                                        '<span>'+
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
    var articleTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}<span class="sizeten"> by<a href=""> {{content.uploader.user.name}}</a></span></span> '    +
                                            '</a>'  +
                                            '</br><div class="lh20">{{ofArticle}}</div> <span ng-click="expand()" class="colorg">{{seeDesc}}</span>'  +
                                            
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="b2w_fade"  >'+
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
    var articleClubTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}<span class="sizeten"> by<a href=""> {{content.uploadedClub.name}}</a></span></span> '    +
                                            '</a>'  +
                                            '</br><div class="lh20">{{ofArticle}}</div> <span ng-click="expand()" class="colorg">{{seeDesc}}</span>'  +
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
    var articleTeamTemplate = '<div>'   +
                                '<div class="post_div" style="width:{{width}}%">'  +
                                    '<div class="box_shadow_dwn   col-md-12">'+
                                        '<div class="text_type_post" id="article">' +
                                            '<a href="">'  +
                                                '<span id="event_post_heading">{{content.articleId.articleName}}<span class="sizeten"> by<a href=""> {{content.team}}</a></span></span> '    +
                                            '</a>'  +
                                            '</br><div class="lh20">{{ofArticle}}</div> <span ng-click="expand()" class="colorg">{{seeDesc}}</span>'  +
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
                                      '  <span><img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="b2w_fade"></span>'+
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
                                                  '<li role="presentation"><a role="menuitem" tabindex="-1" href="" class="w2b" ng-click="deletePost(content._id)">Delete</a></li>'+
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="70px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
                                            '<img src="http://www.rottweilerheartsrescue.org/Images/fade2black.png" height="50px" width="100%" style="opacity:0.5;" id="b2w_fade">'+
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
    var resultsTemplate =   '<div class="post_div col-md-12">'+
                                '<div class="box_shadow_dwn   col-md-12">'+
                                    '<div class="Ellipse_1"></div>'+
                                    '<div class="text_type_post" id="article">'+
                                        '<span id="bold"> {{content.eventId.name}} </span><span id="light">by </span>'+
                                        '<a href=""><span id="award_heading"><img alt="{{ content.uploaderClub.proPic }}" ng-src="http://c15179525.r25.cf2.rackcdn.com/8136545_0_2b0a2099be3b06c2896418e30bb2f461.jpg" class="md-avatar" /> {{content.uploaderClub.name}}</span></a>'+
                                        '<span  id="bold"> Awards </span>'+
                                      
                                        
                                        '<div id="bold" >'+ 
                                            '<span id="light"> {{content.articleId.description}} </span>'+                  
                                        '</div>'+
                                        '<div class="ardecode"><a href=""> Congratulations to Everyone</a></div>'+
                                        '<ul style="list-style-type:none">'+
                                          '<li ng-repeat="winner in content.eventId.winners"><span id="light">{{winner.position+1}})</span> <a href=""><span  id="award_heading"><img alt="{{  }}" ng-src="{{winner.user.proPic}}" class="md-avatar" /> {{winner.user.name}}</span></a>'+
                                        '</ul>'+
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
            case 34:
                template=resultsTemplate;
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
            if(scope.content.type==111){
              
            }
            
            if(scope.content.type<114 && scope.content.type>100){
                scope.ofArticle=scope.content.articleId.description;
                var seeDesc=true;
                scope.seeDesc="Click to read";
            }

            scope.expand=function () {
                if(scope.seeDesc==="Click to read"){
                    seeDesc=false;
                    scope.seeDesc='Click to hide';
                    scope.ofArticle=scope.content.articleId.content;
                }
                else{
                    scope.ofArticle=scope.content.articleId.description;
                    var seeDesc=true;
                    scope.seeDesc="Click to read";
                }
                
            }
                
         
           
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
            console.log('here');
            $http.delete('/api/posts/'+postId).success(function(response){
                console.log(response);
                scope.content=null;
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