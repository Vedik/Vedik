'use strict';

angular.module('myAppApp')
  .controller('EventCtrl', function ($scope,$state,  $location,Auth,$http,ClubEventService) {
    $scope.message = 'Hello';
     $scope.user = Auth.getCurrentUser;
     $scope.postingRight=false;
     $scope.navbar=false;

    
	
	$scope.Id=ClubEventService.getEventId();    
	console.log($scope.Id);

    if($location.url().split('/event/')[1]){
    	var id = $location.url().split('/event/')[1];
    	console.log($location.url().split('/event/')[1]);
    	$scope.eventId=id;
    	
    	$scope.navbar=true;
    }
    else
    	$scope.eventId=$scope.Id.eventId;

    var id=$scope.eventId;
    $http.get('/api/events/'+id).success(function (response){
    	console.log(response);
    	$scope.event=response;
    	console.log($scope.user()._id);
    	if($scope.user()._id===$scope.event.user._id)
	    {
	    	$scope.postingRight=true;
	    }
    });

    console.log($scope.eventId);
    
    $http.get('/api/posts/event/'+$scope.eventId).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });

    $scope.videoSubmit = function (form){
          $http.post('/api/videos/'+$scope.Id.clubId,{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres,type:33,eventId:$scope.eventId,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   };

    $scope.imageSubmit = function (form){
        console.log('form.vedik');
          $http.post('/api/images/'+$scope.Id.clubId,{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,type:32,eventId:$scope.eventId}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
   }

    $scope.postSubmit = function (form){
          $http.post('/api/articles/'+$scope.Id.clubId,{articleName:form.articleName,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,type:31,eventId:$scope.eventId}).success(function (response){
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

  });
