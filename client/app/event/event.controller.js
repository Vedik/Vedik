'use strict';

angular.module('myAppApp')
  .controller('EventCtrl', function ($scope,$state,  $location,Auth,$http) {
    $scope.message = 'Hello';
     $scope.user = Auth.getCurrentUser;
   
     

    
	

   
    	var id = $location.url().split('/event/')[1];
    	console.log($location.url().split('/event/')[1]);
    	
    	
    
    
    

    
    $http.get('/api/events/'+id).success(function (response){
    	console.log(response);
    	$scope.event=response.event;
      $scope.attending=response.attending;
      $scope.attendingNum=$scope.event.attending.length;
    	
    });

    
    
    $http.get('/api/posts/event/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    });

    $scope.addAttend= function (){
      $http.post('/api/events/attend/'+id).success(function (response){
          $scope.attending=true;
          $scope.attendingNum=response;
      })
    }
    $scope.unAttend= function (){
      $http.delete('/api/events/attend/'+id).success(function (response){
          $scope.attending=false;
          $scope.attendingNum=response;
      })
    }

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


  
   

   $scope.postSubmit = function (form){
     
       $http.post('/api/articles/event/'+$scope.event.club._id,{articleName:$scope.form.name,eventId:id,description:$scope.form.description}).success(function (response){
        console.log(response);
        $scope.form={};
        });
      
          
   };

   $scope.imageSubmit = function (){
      $http.post('/api/images/event/'+$scope.event.club._id,{imgName:$scope.form.name,description:$scope.form.description,picUrl:$scope.form.picUrl,eventId:id}).success(function (response){
            console.log(response);
            $scope.form={};
      });
    };
   $scope.videoSubmit = function(){
      $http.post('/api/videos/event/'+$scope.event.club._id,{vidname:$scope.form.name,description:$scope.form.description,posterurl:$scope.form.posterUrl,vidurl:$scope.form.vidUrl,eventId:id}).success(function (response){
            console.log(response);
            $scope.form={};
      });
   };

});
