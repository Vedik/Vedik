'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl', function ($scope,$location, Auth, $state,User,$http) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    var name = $location.url().split('/profile/')[1];
    console.log(name);
    $http.get('/api/users/'+name).success(function (response){
      $scope.user = response;

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
