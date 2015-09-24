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
    $scope.creditName=[];
      $scope.creditUser=[];
    $scope.creditName[0]=[];
      $scope.creditUser[0]=[];
    
    var creditNum=0;
    $scope.addCredit= function (){
      creditNum++;
      console.log(creditNum);
      $scope.creditName[creditNum]=[];
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
    }

   $scope.creditsSubmit = function (){
      console.log($scope.creditName,$scope.creditUser);
   }

    $scope.loadTags = function(query) {

      return $http.get('/api/stages/tagingStage/'+query).success(function (response){
          console.log(response);
          return response;
      });

    };



   $scope.videoSubmit = function (form){
          $http.post('/api/videos',{vidname:form.vidName,description:form.description,posterurl:form.posterUrl,vidurl:form.vidUrl,genres:form.genres,vedik:form.vedik,creditName:$scope.creditName,creditUser:$scope.creditUser}).success(function (response){
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
        $scope.userAbout=$scope.user.about;
         console.log($scope.userAbout);
        $route.reload();
      })

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
