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
      console.log($scope.creditType,$scope.creditUser);
   }

    $scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;

      });

    };

    $scope.searchText    = null;
    $scope.querySearch   = querySearch;

   function querySearch (query,index) {
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
              
              return response.data;
            });
    }


  
   $scope.type=31;

   $scope.setType= function(type){
      if(type==1){
          $scope.type=31;

      }
      else if(type==2){
          $scope.type=32;
      }
      else if(type==3){
          $scope.type=33;
      }
      
   }

   $scope.postSubmit = function (form){
      if($scope.type==31){
           $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
      else if($scope.type==32){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
      }
      else if($scope.type==33){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
          
   };


  });
