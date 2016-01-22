'use strict';

angular.module('myAppApp')
  .controller('WelcomeUserCtrl', function ($scope,$http,$state,Upload, $timeout, Auth) {
    $scope.message = 'Hello';
    $scope.user={};
    $scope.user.galleryPic="http://74211.com/wallpaper/picture_big/beautiful-scenery-wallpaper_1920x1080_2013-top-10-scenery-images-4.jpg";
    $scope.croppedDataUrl="http://www.thedigitalcentre.com.au/wp-content/themes/EndingCredits/images/no-profile-image.jpg";
  	$scope.user= Auth.getCurrentUser;
    if($scope.user().step) 
      $scope.step=4;
    else
      $scope.step=1;
    console.log($scope.step);
    /* for pro pic upload*/
     $scope.uploadProPic = function (dataUrl) {
        Upload.upload({
            url: '/api/users/uploadProPic',
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;

            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            console.log($scope.progress);
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            if($scope.progress==100){
              $scope.goNext=function(){
                $timeout(function() {
                  $scope.step=2;
                },2000);              
              }
              $scope.goNext();
            }
            

        });
    }

    $scope.uploadGalPic = function (dataUrl) {
        Upload.upload({
            url: '/api/users/uploadGalPic',
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
            $timeout(function () {
                $scope.result = response.data;
               
            });
        }, function (response) {
            if (response.status > 0) $scope.errorMsg = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            if($scope.progress==100){
              $scope.goNext=function(){
                $timeout(function() {
                  $scope.step=5;
                  $timeout(function() {
                     $state.go('dashboard');
                  },2000); 
                }, 1500);
                             
              }
              $scope.goNext();
            }
        });
    }

  	$scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;

      });

    };

    $scope.loadClubs = function(query) {

      return $http.get('/api/clubs/search/'+query).success(function (response){
          console.log(response);
          return response;

      });

    };
    $scope.skip=function(num){
      if(num==4){
        $state.go('dashboard');
      }
      else{
        $scope.step=num+1;
      }
      
    }
    $scope.editProfile = function (form){
      $http.post('/api/users/editProfile',{about:form.about,proPic:form.proPic,galleryPic:form.galleryPic,club:form.club,vedik:form.vedik,step:$scope.step}).success(function (response){
        
        $scope.user=response;     
     	  $scope.step=$scope.step+1;
      })

    }
});
