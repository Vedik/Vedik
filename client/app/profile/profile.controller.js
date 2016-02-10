
'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl',function ($scope,$location,Auth, $state,User,$http,$interval,$document,Upload,$timeout) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.loggedInUser= Auth.getCurrentUser;
    var id = $location.url().split('/profile/')[1];
    console.log(id);
    $scope.abcd="1234";
    $http.get('/api/users/'+id).then(function (response){
    
      $scope.user = response.data.user;
         $scope.isFollowing = response.data.isFollowing;
         if($scope.loggedInUser()._id===$scope.user._id){
            $scope.followStatus=$scope.user.subscribed_users.length +' Followers';  
         }
         else if($scope.isFollowing){
            $scope.followStatus="Following";
         }
         else if(!$scope.isFollowing)
         {
            $scope.followStatus="Follow";
         }
         
         $scope.galleryPic=$scope.user.galleryPic;
       if($scope.user.galleryPic)
        {
          $scope.user.galleryPic= $scope.user.galleryPic;
        }
        else
        {  
             $scope.user.galleryPic = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
        }

      if(!$scope.user.proPic)
          {
           $scope.user.proPic = "http://www.thedigitalcentre.com.au/wp-content/themes/EndingCredits/images/no-profile-image.jpg";
        }
      
         

    if(!$scope.user.about)
        {
          $scope.user.about = "Write something about your self!";
        }
   
      $scope.form={};
       $scope.form.about=$scope.user.about;
       console.log($scope.form.about);  

      console.log($scope.user);
      $scope.isLoggedIn = Auth.isLoggedIn;
      console.log($scope.isLoggedIn()+" is isLoggedIn");
      
      console.log($scope.loggedInUser());
      if($scope.loggedInUser()._id==$scope.user._id){
        $scope.vedikName='Your';
      }
      else{
        $scope.vedikName=$scope.user.name;
      }
    })
      .catch( function(err){
        console.log(err);
                   if(err){
        $location.path('/dashboard/');
      }
    });



    
    $scope.tags=[];
  
    $http.get('/api/posts/user/'+id).success(function (response){
        console.log(response);
        $scope.posts = response.posts;
        console.log($scope.posts);
        $scope.respect=0;
        for(var i=0;i<$scope.posts.length;i++)
        {
          if($scope.posts[i].rating){
            $scope.respect=$scope.posts[i].rating +$scope.respect;
          }
          else{
            $scope.respect=$scope.posts[i].like.length +$scope.respect; 
          }
        }
        console.log($scope.respect);
    $scope.stageId=["aa"];
    $scope.stageList=[];
    var x=0;
    for(var i=0;i<$scope.posts.length;i++)
    {
      for(var j=0;j<$scope.posts[i].vedik.length;j++)
      {
          var z=0;
          console.log($scope.posts[i].vedik);
          for(var k=0;k<$scope.stageId.length;k++)
          {
              
              
              if($scope.stageId[k]==$scope.posts[i].vedik[j].vedik._id)
              {
                z=1;
                console.log('sssssssssssssss1');
                break;
              }
              
                
          }

          if(z==0)
              {
                $scope.stageId[x]=$scope.posts[i].vedik[j].vedik._id;
                $scope.stageList[x]={'name':$scope.posts[i].vedik[j].vedik.name, 'id':$scope.posts[i].vedik[j].vedik._id};
                x++; 
              }
          
      }
    }
      console.log($scope.stageId);
      console.log($scope.stageList);

      $scope.creditId=[];
      
      var x=0;
      for(var i=0;i<$scope.posts.length;i++)
      {
        for(var j=0;j<$scope.posts[i].vedik.length;j++)
        {
            var z=0;
            console.log($scope.posts[i].vedik);
            for(var k=0;k<$scope.stageId.length;k++)
            {
                
                
                if($scope.stageId[k]==$scope.posts[i].vedik[j].vedik._id)
                {
                  z=1;
                  console.log('sssssssssssssss1');
                  break;
                }
                
                  
            }

            if(z==0)
                {
                  $scope.stageId[x]=$scope.posts[i].vedik[j].vedik._id;
                  $scope.stageList[x]={'name':$scope.posts[i].vedik[j].vedik.name, 'id':$scope.posts[i].vedik[j].vedik._id};
                  x++; 
                }
            
        }
      }
  });
  
    $scope.credits=[];
    $scope.getCredit = function(index,postId){
      
      $http.get('api/credits/credit/'+postId+'/'+id).success(function (response){
          $scope.credits[index]=angular.copy(response);
          console.log($scope.credits[index]);
        
      })

    }


     $http.get('/api/posts/hof/'+id).success(function (response){
        $scope.hof=response;
     });

    
    $scope.follow = function(){
      console.log($scope.isFollowing);
      if($scope.isFollowing==false)
      {
          $http.get('/api/users/addSubscriber/'+id).success(function (response){
            console.log(response);            
                $scope.isFollowing = true;
                $scope.followStatus="Following";
        });
      }        
      else
      {
          $http.delete('/api/users/deleteSubscriber/'+id).success(function (response){
            console.log(response);
            
                $scope.isFollowing = false;
                $scope.followStatus="Follow";
        });
      }
        
    }
    
    

    $scope.stageDiv = function (id){

        $http.get('/api/posts/stage/user/'+id).success(function (response){
         
            $scope.stageDivPosts = response;
            console.log($scope.stageDivPosts);
        });
    };

    $scope.myFilter = function (item,y) { 
        return item === y; 
    };



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

   $scope.postSubmit = function (form){
      if($scope.type==11){
           $http.post('/api/articles',{articleName:form.name,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
      else if($scope.type==12){
           $http.post('/api/images',{imgName:form.name,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
      }
      else if($scope.type==13){
          $http.post('/api/videos',{vidname:form.name,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,tags:form.tags,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
      }
          
   };

    $scope.imageSubmit = function (form){
        console.log('form.vedik');
         
   }

    $scope.articleSubmit = function (form){
         
   }

    

    

    $scope.editGalleryPic = function (form){
     $http.post('/api/users/galleryPic/',{galleryPic:form.galPicUrl}).success(function (response) {
        $scope.abcd="123";
        $scope.GalleryPic=form.galPicUrl;
        console.log($scope.GalleryPic);

        })

      }

    $scope.editProfile = function (form){
      $http.post('/api/users/editProfile',{name:form.name,about:form.about,proPic:form.proPic,galleryPic:form.galleryPic}).success(function (response){
        
        $scope.user=response;
         
        $('#editUser').modal('hide');
         
      
       
        
        
      })

    }

    // $scope.displayProPic = function(url){
    //     $scope.ProfilePic=url;
    // }

    $scope.editAbout = function (){
        $scope.formAbout=$scope.user.about;
        $scope.editAbout=true;
        console.log($scope.user.about);
       
    }

     $scope.edit=false;
     
     




   $scope.watchVid = function (vidurl) {
   	var a = [];
   	a = vidurl.split('watch?v=');
   	console.log(a[1]);
   	//$state.go('viewPage',{'vidCode':a[1]});
   	$location.url('/viewPage/'+a[1]);
   	
   };

  $scope.uploadProPic = function (dataUrl) {
      console.log(dataUrl);
      if(!dataUrl){
        $window.alert('Oops!! You forgot to add your picture. Do you want to skip?');
      }
      else{
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
            console.log($scope.progress);
            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
            if($scope.progress==100){
              $scope.goNext=function(){
                $timeout(function() {
                  $stage.reload();
                },2000);              
              }
              $scope.goNext();
            }
            

        });
      }
    }

    $scope.uploadGalPic = function (dataUrl) {
        Upload.upload({
            url: '/api/users/uploadGalPic',
            method: 'POST',
            data: {
                file: Upload.dataUrltoBlob(dataUrl)
            },
        }).then(function (response) {
              console.log(response);
              console.log($scope.galleryPic);
              $('#editUser').modal('hide');

              $scope.galleryPic=angular.copy(response.data);
               $scope.$digest();
              console.log($scope.galleryPic);
              // $state.go('profile',{'id':id});

        }, function (response) {
            if (response.status > 0) $scope.errorMsg2 = response.status 
                + ': ' + response.data;
        }, function (evt) {
            $scope.progress2= parseInt(100.0 * evt.loaded / evt.total);
            if($scope.progress2==100){
              $scope.goNext=function(){
                
                             
              }
              $scope.goNext();
            }
        });
    }


   
   $scope.test=true; 

   

  })



.directive('elastic', [
    '$timeout',
    function($timeout) {
        return {
            restrict: 'A',
            link: function($scope, element) {

                $scope.initialHeight = $scope.initialHeight || element[0].style.height;
                var resize = function() {
                    element[0].style.height = $scope.initialHeight + 20;
                    element[0].style.height = "" + element[0].scrollHeight + "px";
                };
                element.on("input change", resize);
                $timeout(resize, 0);
            }
        };
    }
]);


(function () {
  'use strict';
  angular
      .module('myAppApp')
      .controller('AutoComplete', AutoComplete);
  function AutoComplete ($timeout, $q,$scope,$http) {


      var self = this;

    
    
   
    self.credit=[];


    // ******************************
    // Internal methods
    // ******************************

    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
    function querySearch (query,index) {
      return $http.get('/api/creditDets/search/'+query).then(function(response){
              console.log(response);
              creditaaa[index]=response.data;
              return response.data;
            });
    }
    var x;
    $scope.saveCredit =function (creditType,index){
      console.log(creditType,index);
      x=$scope.creditType[index]=creditType.creditDetail;
      console.log($scope.creditType);
      $scope.test();
    }

   
  

  }
})(); 



angular
  .module('myAppApp')
  .controller('InputCtrl', function($scope) {
    $scope.user = {
      title: 'Developer',
      email: 'ipsum@lorem.com',
      firstName: '',
      lastName: '' ,
      company: 'Google' ,
      address: '1600 Amphitheatre Pkwy' ,
      city: 'Mountain View' ,
      state: 'CA' ,
      biography: 'Loves kittens, snowboarding, and can type at 130 WPM.\n\nAnd rumor has it she bouldered up Castle Craig!',
      postalCode : '94043'
    };
  })
  .config( function($mdThemingProvider){
    // Configure a dark theme with primary foreground yellow
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
  });