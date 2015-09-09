'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl',function ($scope,$location,Auth, $state,User,$http,$interval) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    var id = $location.url().split('/profile/')[1];
    console.log(id);
    $scope.abcd="1234";
    $http.get('/api/users/'+id).success(function (response){
      $scope.user = response;
       if($scope.user.galleryPic)
        {
          $scope.GalleryPic= $scope.user.galleryPic;
        }
    else
    {  
         $scope.GalleryPic = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

    if($scope.user.about)
        {
          $scope.userAbout= $scope.user.about;
        }
    else
    {  
         $scope.userAbout = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

      $scope.form={};
       $scope.form.about=$scope.user.about;
       console.log($scope.form.about);  
    });
    console.log($scope.user);
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn()+" is isLoggedIn");
    $scope.loggedInUser = User.get();
    console.log(User.get());
    $scope.tags=[];
  
    $http.get('/api/posts/user/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });


    $scope.getSuggestionsForNames = function (query){
      return $http.get('/api/users/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    };
    $scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;
      });

    };

   $scope.videoSubmit = function (form){
          $http.post('/api/videos',{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   };

    $scope.imageSubmit = function (form){
        console.log('form.vedik');
          $http.post('/api/images',{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
   }

    $scope.articleSubmit = function (form){
          $http.post('/api/articles',{articleName:form.articleName,description:form.description,content:form.content,tags:form.tags}).success(function (response){
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
     $http.post('/api/users/galleryPic/',{galleryPic:form.galPicUrl}).success(function (response) {
        $scope.abcd="123";
        $scope.GalleryPic=form.galPicUrl;
        console.log($scope.GalleryPic);

        })

      }

    $scope.editProfile = function (form,type){
      $http.post('/api/users/editProfile/'+type,{editProfile:form}).success(function (response){
        
        $scope.user=response;
        $scope.GalleryPic=$scope.user.galleryPic;
        $scope.edit=false;         
        $scope.userAbout=$scope.user.about;
         console.log($scope.userAbout);
        $route.reload();
      })

    }

    $scope.editAbout = function (){
        $scope.formAbout=$scope.user.about;
        $scope.editAbout=true;
        console.log($scope.user.about);
       
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
