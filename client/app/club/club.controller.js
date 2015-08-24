'use strict';

angular.module('myAppApp')
  .controller('ClubCtrl', function ($scope,$location,Auth, $state,User,$http,$interval) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    var id = $location.url().split('/club/')[1];
    console.log(id);
    
    $http.get('/api/clubs/'+id).success(function (response){
      $scope.club = response;
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


    $scope.getSuggestionsForNames = function (query){
      return $http.get('/api/users/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    }


   $scope.videoSubmit = function (form){
          $http.post('/api/videos/'+id,{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   }

    $scope.imageSubmit = function (form){
          $http.post('/api/images/'+id,{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tages:form.tags}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
   }

    $scope.articleSubmit = function (form){
          $http.post('/api/articles/'+id,{articleName:form.articleName,description:form.description,content:form.content,tags:form.tags}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   }

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


  });
