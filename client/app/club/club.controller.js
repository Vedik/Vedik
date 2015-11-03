'use strict';

angular.module('myAppApp')
  .controller('ClubCtrl', function ($scope,$location,Auth, $state,User,$http,$interval,ClubEventService) {
    

    $scope.club = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    var id = $location.url().split('/club/')[1];
    console.log(id);
    $scope.clubId=id;

    
    
    $http.get('/api/clubs/'+id).success(function (response){
      $scope.club = response.club;
      $scope.isFollowing = response.isFollowing;

       if($scope.club.galleryPic)
        {
          $scope.GalleryPic= $scope.club.galleryPic;
        }
    else
    {  
         $scope.GalleryPic = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

    if($scope.club.about)
        {
          $scope.userAbout= $scope.club.about;
        }
    else
    {  
         $scope.userAbout = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

      $scope.form={};
       $scope.form.about=$scope.club.about;
       console.log($scope.form.about);  
    });
    console.log($scope.club);
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn()+" is isLoggedIn");
    $scope.loggedInUser = User.get();
    console.log(User.get());
    $scope.tags=[];
  
    $http.get('/api/posts/club/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });

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
      console.log($scope.creditName,$scope.creditUser);
   }

   $scope.searchText    = null;
    $scope.querySearch   = querySearch;

   function querySearch (query,index) {
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
              
              return response.data;
            });
    }


   $scope.type=21;

   $scope.setType= function(type){
      if(type==1){
          $scope.type=21;

      }
      else if(type==2){
          $scope.type=22;
          console.log($scope.type);
      }
      else if(type==3){
          $scope.type=23;
          console.log($scope.type);
      }
      
   }

   $scope.postSubmit = function (form){
      if($scope.type==21){
           $http.post('/api/articles/'+id,{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
      else if($scope.type==22){
           $http.post('/api/images/'+id,{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
      }
      else if($scope.type==23){
          $http.post('/api/videos/'+id,{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
          
   };

  

   $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  // };

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

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];


   $scope.createEvent = function (form){
          $http.post('/api/events/'+id,{name:form.name,description:form.description,location:form.location,startDate:form.dtSD,endDate:form.dtED,tages:form.tags,vedik:form.vedik,eventCover:form.galPic}).success(function (response){
            console.log(response);
            $state.go('event',{id:response._id});

        })
   }

   $scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;
      });

    };

    $scope.getSuggestionsForCredits = function (query){
      return $http.get('/api/creditDets/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    }

    $scope.editGalleryPic = function (form){
     $http.post('/api/clubs/galleryPic/',{galleryPic:form.galPicUrl}).success(function (response) {
        
        $scope.GalleryPic=form.galPicUrl;
        console.log($scope.GalleryPic);

        })

      }

    $scope.editProfile = function (form,type){
      $http.put('/api/clubs/editProfile/'+type,{editProfile:form}).success(function (response){
        
        $scope.club=response;
        $scope.GalleryPic=$scope.club.galleryPic;
        $scope.edit=false;         
        $scope.userAbout=$scope.club.about;
         console.log($scope.userAbout);
        $route.reload();
      })

    }

    $scope.viewImage =function(imageId){
    	console.log('s');
    }

    $scope.editAbout = function (){
        $scope.formAbout=$scope.club.about;
        $scope.editAbout=true;
        console.log($scope.club.about);
       
    }

     $scope.edit=false;
     
     




   $scope.watchVid = function (vidurl) {
   	var a = [];
   	a = vidurl.split('watch?v=');
   	console.log(a[1]);
   	//$state.go('viewPage',{'vidCode':a[1]});
   	$location.url('/viewPage/'+a[1]);
   	
   };

   $scope.submitCredit = function (creditDet){
    $http.post('/api/creditDets',{creditDetail:creditDet}).success(function (response){
      console.log(response);
    })
   };

   $http.get('/api/events/club/'+id).success(function (response){
        console.log(response);
        $scope.eventsList = response;
    });

   $scope.showEvent=false;
   $scope.displayPosts=true;
   $scope.clubPostsDisplay = function (){
      $scope.showEvent=false;
     $scope.displayPosts=true;
  };

    $scope.clubTabsDisplay = function (eventId){
          ClubEventService.setEventId(eventId,$scope.clubId);
          $scope.showEvent=false;
          
          $scope.displayPosts=false;
          if($scope.showEvent==false)
          $scope.showEvent=true;
          
  };

  $scope.follow = function(){
        $http.get('/api/clubs/'+id+'/addSubscriber').success(function (response){
            console.log(response);
            if(response.added==true){
                $scope.isFollowing = true;
            }
        });
    }
    $scope.unfollow = function(){
        $http.delete('/api/clubs/'+id+'/deleteSubscriber').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.isFollowing = false;
            }
        });
    }


  })


.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {

                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight + 20;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);

angular.module('myAppApp').
  controller('ParallaxEff', function($scope, parallaxHelper2){
    $scope.background = parallaxHelper2.createAnimator(-0.8, 150, -150);
    $scope.invertColors = function(elementPosition) {
      var factor = -0.4;
      var pos = Math.min(Math.max(elementPosition.elemY*factor, 0), 255);
      var bg = 255-pos;
      return {
        backgroundColor: 'rgb(' + bg + ', ' + bg + ', ' + bg + ')',
        color: 'rgb(' + pos + ', ' + pos + ', ' + pos + ')'
      };
    }

});


angular.module('myAppApp').
factory('parallaxHelper2',
  function() {
    function createAnimator (factor, max, min, offset) {
      return function(params) {
        var delta = factor*((offset || 0) + params.elemY);
        // if(angular.isNumber(max) && delta > max) return max;
        // if(angular.isNumber(min) && delta < min) return min;
        return delta;
      };
    }
    return {
      createAnimator: createAnimator,
      background:     createAnimator(-0.8, 150, -150)
    };
});