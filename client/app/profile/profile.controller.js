'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', ['$scope', '$location', 'Auth', '$state' ,'User','$http','$interval',function ($scope,$location, Auth, $state,User,$http,$interval) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    var name = $location.url().split('/profile/')[1];
    console.log(name);
    $scope.abcd="1234";
    $http.get('/api/users/'+name).success(function (response){
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

      console.log(response);
    });
    console.log($scope.user);
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn()+" is isLoggedIn");
    $scope.loggedInUser = User.get();
    console.log(User.get());
    $scope.tags=[];
  



    $scope.getSuggestionsForNames = function (query){
      return $http.get('/api/users/search/'+query).success(function (response) {
        console.log(response);
        return response;
      });
    }


   $scope.videoSubmit = function (form){
          $http.post('/api/videos',{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   }

    $scope.imageSubmit = function (form){
          $http.post('/api/images',{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tages:form.tags}).success(function (response){
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
        console.log($scope.user.name);
      })

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

  }])
.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {
                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);
