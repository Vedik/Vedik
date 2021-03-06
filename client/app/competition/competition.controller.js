'use strict';

angular.module('myAppApp')
  .controller('CompetitionCtrl', function ($scope,$state, $timeout, $mdToast,$location,Auth,$http,Upload) {
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
      if($scope.event.subType=='Image'){
        $scope.accept='image/*';
      }
      else if($scope.event.subType=='Video'){
        $scope.accept='video/*';
      }
      else if($scope.event.subType=='Document'){
        $scope.accept='application/pdf';
      }
      console.log($scope.accept)
      

    	
    });

    $scope.uploadPic = function(file,form) {
      file.upload = Upload.upload({
        url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        data: {file: file, username: form.name,description:form.description},
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
        });
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
    
    
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
    // $scope.subEntry= function (entry){
    //   	$http.post('/api/events/subEntry/'+id,{entry:entry,attending:$scope.attending}).success(function (response){
    //   		console.log('done');
    //   		$scope.event=response.event;
    //   		$scope.attending=response.attending;

    //   	})
    // }


      
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

   $scope.entries=[];
   $scope.a=[];
   // $scope.selectEntry=function (entry){
   // 		$scope.entries.push(entry);
   // 		console.log('added');
   // 		console.log($scope.entries);
   // }

   $scope.myValueFunction = function(entry) {
   	console.log('here2');
   return -entry.entry.rating;
};

   $scope.declareRes = function(entries,event){
   		console.log(entries);
   		var x=entries.length;
      var num=event.resNo;
   		entries.splice(num,x-num);
   		console.log(entries);

   		var position=['First','Second','Third','Fourth','Fifth','Sixth','Seventh','Eight','Ninth','Tenth'];
   		for(var i=0;i<entries.length;i++)
   		{
   			$http.post('/api/events/declareRes/'+id,{user:entries[i].user,num:i,position:position[i]}).success(function (response){
       			console.log('here');
            $http.post('/api/articles/eventResults/'+$scope.event.club._id,{eventId:id,description:event.message}).success(function (response){
                console.log(response);
                // response.articleId={articleName:$scope.form.name,description:$scope.form.description};
                // response.uploader={user:{name:$scope.user().name}};
                // $scope.form={};
             
                $scope.posts.push(response);
                console.log($scope.posts);
                $('#declareRes').modal('hide');
            });
      
   		
   		})
   		}
   		
   }

    $scope.subEntry = function(file,form) {
      console.log(file);
      var file2;
      if($scope.event.subType=='Image'){
        file2=Upload.dataUrltoBlob(file.$ngfDataUrl);
      }
      else if($scope.event.subType=='Video'){
        file2=file;
      }
      else if($scope.event.subType=='Document'){
        file2=file;
      }
      file.upload = Upload.upload({
        url: '/api/events/subEntry/'+id,
        method:'POST',
        data: {file: file2 ,
          name:form.name,
          description:form.description,
          attending:$scope.attending
        },
      });

      file.upload.then(function (response) {
        $scope.success=true;
        $("#success_tick").addClass('infiZoom');
        $timeout(function () {
          file.result = response.data;
          $scope.event.entries=response.data.entries;
            $scope.attending=response.attending;
            $('#submitEntry').modal('hide');
        },1500);
      }, function (response) {
        if (response.status > 0)
          $scope.errorMsg = response.status + ': ' + response.data;
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    }
});
