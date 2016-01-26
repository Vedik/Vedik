//global variable
var ranX, ranY=0,attendArray=[],likeArray=[],userId,id;

'use strict';


angular.module('myAppApp')
  .controller('UploadPortalCtrl', function ($scope,Auth,$http, UploadPortalService,User,$timeout) {
    $scope.message = 'Hello';
    $scope.submitted = false;
    $scope.user = Auth.getCurrentUser;
   

  
  

     /*$http.get('/api/bookings/').success(function (response){
        console.log(response);
        $scope.bookings = response;
        console.log($scope.bookings);
    });*/
    
    /* $scope.like = function(postId){
        $http.get('/api/posts/'+postId+'/like').success(function (response){
            console.log(response);
            scope.content.like.length=response;
            
        });
    }
    $scope.unlike = function(postId){
        $http.delete('/api/posts/'+postId+'/unlike').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.liked = false;
            }
        });
    }*/



    $scope.creditsRadio="team";$scope.creditsRadioB=true;

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

    $scope.loadCredit = function(query) {
        console.log('sa');
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
          return response.data;

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


   /*$scope.getVideoDetails = function (videoId){
      console.log(videoId);
      var a = videoId.split('watch?v=');
      if(a[1])
      {
        var video_id='HfLZnE3fIyI';
        var key='AIzaSyChm_agHP2KpiAIaoN8-s7EvnOxYeOSthQ';

        /*$.getJSON('https://www.googleapis.com/youtube/v3/videos?id='+video_id+'&key='+key+'&part=snippet',function(data,status,xhr){
            alert(data);
            // data contains the JSON-Object below
        });
        $http.get('https://www.googleapis.com/youtube/v3/videos?id='+video_id+'&key='+key+'&part=snippet').success(function (response){
          console.log(response);
        })
      }
   }*/
   $scope.type=11;

   $scope.setType= function(type){
      if(type==1){
          $scope.type=11;

      }
      else if(type==2){
          $scope.type=12;
      }
      else if(type==3){
          $scope.type=13;
      }
      
   }
   $scope.submitted=false;
   $scope.postSubmit = function (form){
    $scope.submitted=true;
    console.log(form,form.$valid);

   
    if($scope.creditsRadio=='team' && form.$valid){
       $scope.newUpload=[]; 
       $scope.editForm={};
        console.log("yo");
      if($scope.type==11){

          $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
              $http.get('/api/posts/show/'+response).success(function (res){
                  $scope.editForm=$scope.form;
                  $scope.form={}; 
                  $scope.newUpload.push(res);
                  
                  console.log($scope.newUpload);  
                
                  $('#newUpload').addClass("animated  zoomIn ");
              })
            
           
          })
      }
      else if($scope.type==12){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
              $http.get('/api/posts/show /'+response).success(function (res){
                  $scope.editForm=$scope.form;
                  $scope.form={}; 
                  $scope.newUpload.push(res);
                  console.log($scope.newUpload);  
                
                  $('#newUpload').addClass("animated  zoomIn ");
              })
        })
      }
      else if($scope.type==13){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,team:form.team,creditType:$scope.creditType,creditUser:$scope.creditUser,creditsRadio:$scope.creditsRadio}).success(function (response){
            $http.get('/api/posts/show/'+response).success(function (res){
                $scope.editForm=$scope.form;
                $scope.form={}; 
                $scope.newUpload.push(res);
                console.log($scope.newUpload);  
              
                $('#newUpload').addClass("animated  zoomIn ");
            })
        })
      }
    }
    else if($scope.creditsRadio=='me' && form.$valid){
       $scope.newUpload=[];
       $scope.editForm={}; 
        console.log(form.userCredits,$scope.creditTo,form.club);
         if($scope.type==11){
           $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            $http.get('/api/posts/show/'+response).success(function (res){
                $scope.editForm=$scope.form;
                $scope.form={}; 
                $scope.newUpload.push(res);
                console.log($scope.newUpload);  
              
                $('#newUpload').addClass("animated  zoomIn ");
            })
        })
      }
      else if($scope.type==12){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            $http.get('/api/posts/show/'+response).success(function (res){
                $scope.editForm=$scope.form;
                $scope.form={}; 
                $scope.newUpload.push(res);
                console.log($scope.newUpload);  
              
                $('#newUpload').addClass("animated  zoomIn ");
            })
        })
      }
      else if($scope.type==13){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,team:$scope.creditTo,credits:form.userCredits,creditsRadio:$scope.creditsRadio,club:form.club}).success(function (response){
            $http.get('/api/posts/show/'+response).success(function (res){
                $scope.editForm=$scope.form;
                $scope.form={}; 
                $scope.newUpload.push(res);
                console.log($scope.newUpload);  
              
                $('#newUpload').addClass("animated  zoomIn ");
            })
        })
      }
    }

    $scope.edited =true;
    $scope.edit=function(){
      $scope.edited =false;
      $scope.form=$scope.editForm;
    }

     
          
   };
    
    
    /*
    $scope.submit = function (form){
    	$scope.submitted = true;
    	//validation
    	form.uploader = Auth.getCurrentUser()._id;
    	console.log(form.uploader);
    	UploadPortalService.submitForm(form).then(function (response){
    		if(response){ console.log(response); }
    		else {console.log('no data received'); }
    	});
    };*/

 //onclick="document.getElementById(for_blur).style.filter = blur(40px)"

})





// .directive('enforceMaxTags', function() {
//   return {
//     require: 'ngModel',
//     link: function(scope, element, attrs, ngCtrl) {
//       var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;

//       ngCtrl.$parsers.push(function(value) {
//         if (value && maxTags && value.length > maxTags) {
//           value.splice(value.length - 1, 1);
//         }
//         return value;
//       });
//     }
//   };
// });


