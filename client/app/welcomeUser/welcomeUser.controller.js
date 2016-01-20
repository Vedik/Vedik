'use strict';

angular.module('myAppApp')
  .controller('WelcomeUserCtrl', function ($scope,$http,$state,Upload, $timeout) {
    $scope.message = 'Hello';
    $scope.user={};
    $scope.user.galleryPic="http://74211.com/wallpaper/picture_big/beautiful-scenery-wallpaper_1920x1080_2013-top-10-scenery-images-4.jpg";
    $scope.croppedDataUrl="http://www.thedigitalcentre.com.au/wp-content/themes/EndingCredits/images/no-profile-image.jpg";
  	$scope.step=1;
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
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
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
      $http.post('/api/users/editProfile',{about:form.about,proPic:form.proPic,galleryPic:form.galleryPic,club:form.club,vedik:form.vedik}).success(function (response){
        
        $scope.user=response;     
     	$state.go('dashboard');
      })

    }
});
