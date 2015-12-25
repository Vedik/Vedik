'use strict';

angular.module('myAppApp')
  .controller('WelcomeUserCtrl', function ($scope,$http,$state) {
    $scope.message = 'Hello';
    $scope.user={};
    $scope.user.galleryPic="http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    $scope.user.proPic="http://www.thedigitalcentre.com.au/wp-content/themes/EndingCredits/images/no-profile-image.jpg";
  	
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

    $scope.editProfile = function (form){
      $http.post('/api/users/editProfile',{about:form.about,proPic:form.proPic,galleryPic:form.galleryPic,club:form.club,vedik:form.vedik}).success(function (response){
        
        $scope.user=response;     
     	$state.go('dashboard');
      })

    }
});
