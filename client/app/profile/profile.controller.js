var creditaaa=[];
'use strict';

angular.module('myAppApp')
  .controller('ProfileCtrl',function ($scope,$location,Auth, $state,User,$http,$interval) {
    $scope.message = 'Hello';
    $scope.isLoggedIn = Auth.isLoggedIn;
    var id = $location.url().split('/profile/')[1];
    console.log(id);
    $scope.abcd="1234";
    $http.get('/api/users/'+id).success(function (response){
      $scope.user = response.user;
         $scope.isFollowing = response.isFollowing;
       if($scope.user.galleryPic)
        {
          $scope.GalleryPic= $scope.user.galleryPic;
        }
    else
    {  
         $scope.GalleryPic = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

    if($scope.user.proPic)
        {
          $scope.ProfilePic= $scope.user.proPic;
        }
    else
    {  
         $scope.ProfilePic = "http://www.thedigitalcentre.com.au/wp-content/themes/EndingCredits/images/no-profile-image.jpg";
    }

    if($scope.user.about)
        {
          $scope.userAbout= $scope.user.about;
        }
    else
    {  
         $scope.userAbout = "http://www.goodnik.net/assets/default-7e3f08530293551aa4ff5fbd7c0995c5.png";
    }

      $scope.form={};
       $scope.form.about=$scope.user.about;
       console.log($scope.form.about);  
    });
    console.log($scope.user);
    $scope.isLoggedIn = Auth.isLoggedIn;
    console.log($scope.isLoggedIn()+" is isLoggedIn");
    $scope.loggedInUser = User.get();
    console.log(User.get());
    $scope.tags=[];
  
    $http.get('/api/posts/user/'+id).success(function (response){
        console.log(response);
        $scope.posts = response;
        console.log($scope.posts);
    

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
  });




    
    $scope.follow = function(){
        $http.get('/api/users/'+id+'/addSubscriber').success(function (response){
            console.log(response);
            if(response.added==true){
                $scope.isFollowing = true;
            }
        });
    }
    $scope.unfollow = function(){
        $http.delete('/api/users/'+id+'/deleteSubscriber').success(function (response){
            console.log(response);
            if(response.removed==true){
                $scope.isFollowing = false;
            }
        });
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

   $scope.videoSubmit = function (form){
          $http.post('/api/videos',{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres,vedik:form.vedik,creditType:$scope.creditType,creditUser:$scope.creditUser}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   };

    $scope.imageSubmit = function (form){
        console.log('form.vedik');
          $http.post('/api/images',{imgName:form.imgName,description:form.description,picUrl:form.picUrl,tags:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
            console.log(form.imgName);
        })
   }

    $scope.articleSubmit = function (form){
          $http.post('/api/articles',{articleName:form.articleName,description:form.description,content:form.content,tags:form.tags,vedik:form.vedik}).success(function (response){
            console.log(response);
            $scope.form={};
        })
   }

    

    

    $scope.editGalleryPic = function (form){
     $http.post('/api/users/galleryPic/',{galleryPic:form.galPicUrl}).success(function (response) {
        $scope.abcd="123";
        $scope.GalleryPic=form.galPicUrl;
        console.log($scope.GalleryPic);

        })

      }

    $scope.editProfile = function (form,type){
      $http.post('/api/users/editProfile/'+type,{editProfile:form}).success(function (response){
        
        $scope.user=response;
        $scope.GalleryPic=$scope.user.galleryPic;
        $scope.edit=false;
        $scope.ProfilePic=$scope.user.proPic;         
        $scope.userAbout=$scope.user.about;
        $scope.modal="modal";
         console.log($scope.userAbout);
        if(type==1)
        {
          $state.reload();
        }
      })

    }

    $scope.displayProPic = function(url){
        $scope.ProfilePic=url;
    }

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

    
    
    self.searchText    = null;
    self.querySearch   = querySearch;
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

    $scope.test = function(){
      console.log(creditaaa);
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