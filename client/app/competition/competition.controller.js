'use strict';

angular.module('myAppApp')
  .controller('CompetitionCtrl', function ($scope,$state,  $mdToast,$location,Auth,$http) {
    $scope.message = 'Hello';
     $scope.user = Auth.getCurrentUser;
   
     

    
	

   
    	var id2 = $location.url().split('/competition/')[1];
    	var id= id2.split('#')[0];
    	console.log(id);
    	
    	
    
    
    

    
    $http.get('/api/events/comp/'+id).success(function (response){
      console.log(response);
      $scope.event=response.event;
      $scope.attending=response.attending;
      $scope.submitted=response.submitted;
      console.log($scope.submitted);
      $scope.attendingNum=$scope.event.entries.length;

      var date1 = new Date($scope.event.startDate);
      console.log(date1);
      var d = date1.getDate();
      var m = date1.getMonth()+1;
      var y = date1.getFullYear();
      $scope.startDate=d+"/"+m+"/"+y;

      if($scope.event.endDate)
      {
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

    $scope.attend= function (){
    	if(!$scope.attending){
    		 $http.post('/api/events/attend/'+id).success(function (response){
	          $scope.attending=true;
	          $scope.attendingNum=response;
	      })
    	}
	     
    	else{
    		$http.delete('/api/events/attend/'+id).success(function (response){
	          $scope.attending=false;
	          $scope.attendingNum=response;
	      })
    	}
	      
    }
    $scope.subEntry= function (entry){
      	$http.post('/api/events/subEntry/'+id,{entry:entry,attending:$scope.attending}).success(function (response){
      		console.log('done');
      		$scope.event=response.event;
      		$scope.attending=response.attending;

      	})
    }


      
      $scope.max = 10;
     
     
      // if($scope.user()._id==$scope.event.user._id)
      // {
      		$scope.isReadonly = false;
      // }
      // else
      // 		$scope.isReadonly=true;
      

     
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      }

      $scope.ratePost = function(rate,entryId) {
            $http.post('/api/entrys/'+entryId,{rating:rate}).success(function (response){
            console.log(response);    
           
        });
      };

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
        response.articleId={articleName:$scope.form.name,description:$scope.form.description};
        response.uploader={user:{name:$scope.user().name}};
        $scope.form={};
        
        
        console.log(response);
        $scope.posts.push(response);
        console.log($scope.posts);

     //    $mdToast.show(
     //  	$mdToast.simple()
     //    .textContent('Announcement Made!')
     //    .hideDelay(3000)
    	// );
       
      
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
