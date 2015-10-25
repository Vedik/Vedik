'use strict';

angular.module('myAppApp')
  .controller('ClubCtrl', function ($scope,$location,Auth, $state,User,$http,$interval,ClubEventService,parallaxHelper) {
    
    $scope.background = parallaxHelper.createAnimator(-0.3, 150, -150);
    $scope.message = 'Hello';
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

     $scope.creditName=[];
      $scope.creditUser=[];
    $scope.creditName[0]=[];
      $scope.creditUser[0]=[];
     var creditNum=0;
    $scope.addCredit= function (){
      creditNum++;
      console.log(creditNum);
      $scope.creditName[creditNum]=[];
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
    }

   $scope.creditsSubmit = function (){
      console.log($scope.creditName,$scope.creditUser);
   }


   $scope.videoSubmit = function (form){
          $http.post('/api/videos/'+id,{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres,vedik:form.vedik,creditName:$scope.creditName,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   }

    $scope.imageSubmit = function (form){
          $http.post('/api/images/'+id,{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
   }

    $scope.articleSubmit = function (form){
          $http.post('/api/articles/'+id,{articleName:form.articleName,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   };

   $scope.createEvent = function (form){
          $http.post('/api/events/'+id,{name:form.name,description:form.description,startDate:form.dtSD,endDate:form.dtED,tages:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
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

