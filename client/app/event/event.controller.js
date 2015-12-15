'use strict';

angular.module('myAppApp')
  .controller('EventCtrl', function ($scope,$state,  $location,Auth,$http) {
    $scope.message = 'Hello';
     $scope.user = Auth.getCurrentUser;
   
     

    
	

   
    	var id = $location.url().split('/event/')[1];
    	console.log($location.url().split('/event/')[1]);
    	
    	
    
    
    

    
    $http.get('/api/events/event/'+id).success(function (response){
    	console.log(response);
    	$scope.event=response.event;
      $scope.attending=response.attending;
      $scope.attendingNum=$scope.event.attending.length;
      var date1 = new Date($scope.event.startDate);
      console.log(date1);
      var d = date1.getDate();
      var m = date1.getMonth()+1;
      var y = date1.getFullYear();
      $scope.startDate=d+"/"+m+"/"+y;

      if($scope.event.endDate){
          var date2 = new Date($scope.event.endDate);
          var d = date2.getDate();
          var m = date2.getMonth()+1;
          var y = date2.getFullYear();
          $scope.endDate=d+"/"+m+"/"+y;
      }
      

    	
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
        $scope.posts.push(response);
        console.log($scope.posts);
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
   $scope.BPost = function (form){
     
       $http.post('/api/articles/event/broadcast/'+$scope.event.club._id,{articleName:$scope.form.name,eventId:id,description:$scope.form.description}).success(function (response){
        console.log(response);
        $scope.form={};
        });
      
          
   };

   $scope.BImage = function (form){
    console.log('here');
      $http.post('/api/images/event/broadcast/'+$scope.event.club._id,{imgName:form.name,description:form.description,picUrl:form.picUrl,eventId:id}).success(function (response){
            console.log(response);
            $scope.form={};
      });
    };
   $scope.BVideo = function(){
      $http.post('/api/videos/event/broadcast/'+$scope.event.club._id,{vidname:$scope.form.name,description:$scope.form.description,posterurl:$scope.form.posterUrl,vidurl:$scope.form.vidUrl,eventId:id}).success(function (response){
            console.log(response);
            $scope.form={};
      });
   };

});

angular.module('myAppApp')

.controller('AppCtrl', function($scope, $mdToast, $document) {
  var last = {
      bottom: false,
      top: true,
      left: false,
      right: true
    };

  $scope.toastPosition = angular.extend({},last);

  $scope.getToastPosition = function() {
    sanitizePosition();

    return Object.keys($scope.toastPosition)
      .filter(function(pos) { return $scope.toastPosition[pos]; })
      .join(' ');
  };

  function sanitizePosition() {
    var current = $scope.toastPosition;

    if ( current.bottom && last.top ) current.top = false;
    if ( current.top && last.bottom ) current.bottom = false;
    if ( current.right && last.left ) current.left = false;
    if ( current.left && last.right ) current.right = false;

    last = angular.extend({},current);
  }

  

  $scope.showSimpleToast = function() {
    $mdToast.show(
      $mdToast.simple()
        .textContent('Simple Toast!')
        .position($scope.getToastPosition())
        .hideDelay(3000)
    );
  };

  
})

