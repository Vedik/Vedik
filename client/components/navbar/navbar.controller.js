'use strict';

angular.module('myAppApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth,$http, $timeout, $mdSidenav, $log) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    var pendingTask;
    $scope.isCollapsed = true;
    $scope.notif=false;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log($scope.getCurrentUser().name);

    $scope.showNotif=false;


    if($scope.getCurrentUser().name)
    {


        $http.get('/api/posts/unseenNotifs').success(function (response){
            console.log(response);
            $scope.posts = response;
            console.log($scope.posts);

            $scope.dummyId=[];
            $scope.dummyName=[];
            $scope.clubId=[];
            $scope.clubName=[];
            var x=0;
            var y=0;
            for(var i=0;i<$scope.posts.length;i++)
            {
              if($scope.posts[i].type>14 && $scope.posts[i].uploader)
              {
                var found=false;
                for(var j=0;j<$scope.clubId.length;j++)
                {
                  if(($scope.clubId[j]==$scope.posts[i].uploaderClub._id) && $scope.posts[i].type>14)
                  {
                    found=true;
                    break;
                  }

                }
                if(found==false)
                {
                  $scope.clubId[y]=$scope.posts[i].uploaderClub._id;
                  
                  $scope.clubName[y]=$scope.posts[i].uploaderClub.name;
                  y++;
                }
              }
              else if($scope.posts[i].type<14 && $scope.posts[i].uploader)
              {
                var found=false;
                for(var j=0;j<$scope.dummyId.length;j++)
                {
                  if(($scope.dummyId[j]==$scope.posts[i].uploader.user._id) && $scope.posts[i].type<14)
                  {
                    found=true;
                    break;
                  }

                }
                if(found==false)
                {
                  $scope.dummyId[x]=$scope.posts[i].uploader.user._id;
                  console.log($scope.dummyId[x]);
                  $scope.dummyName[x]={name:$scope.posts[i].uploader.user.name,proPic:$scope.posts[i].uploader.user.proPic};
                  x++;
                }
              }
            }
            console.log($scope.dummyId,$scope.dummyName);
        });
    }

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

      
    $scope.change = function(){
      if(pendingTask) {
      clearTimeout(pendingTask);
      }
      $scope.objs = [];
      $scope.objsClub=[];
      $scope.club="";
      $scope.userList="";
      $scope.vedik="";
      $scope.UserList=1;
      $scope.Club=1;
      $scope.Stage=1;

      $scope.searchStage=false;
      $scope.searchClub=false;
      $scope.searchUser=false;
      $scope.noResult=false;

      pendingTask = setTimeout(fetch, 300);
    };

    function fetch () {
                

      if($scope.searchQuery.length!=0) {
        $http.get('/api/users/search/'+$scope.searchQuery).success(function (response) {
          if(response) {
            if(response.length==10) {
              response.push({name:"More...",href:"/searchResults/all/"+$scope.searchQuery});
              $scope.objs = response;
              $scope.searchUser=true;
              $scope.userList="Users";
            }
            else {
              $scope.objs = response;
              $scope.searchUser=true;
              $scope.userList="Users";
            }
          }
          if(response.length==0) {
            $scope.objs = [];
             $scope.searchUser=false;
             $scope.UserList=0;
            console.log($scope.UserList);
          }
        });
         $http.get('/api/clubs/search/'+$scope.searchQuery).success(function (response) {
          if(response) {
            if(response.length==10) {
              response.push({name:"More...",href:"/searchResults/all/"+$scope.searchQuery});
              $scope.objsClub = response;
              $scope.searchClub=true;
               $scope.club="Clubs";
            }
            else {
              $scope.objsClub = response;
              $scope.searchClub=true;
              $scope.club="Clubs";
            }
          }
          if(response.length==0) {
            $scope.objsClub = [];
             $scope.searchClub=false;
             $scope.Club=0;
            console.log($scope.Club);
          }
        });
         $http.get('/api/stages/search/'+$scope.searchQuery).success(function (response) {
          if(response) {
            if(response.length==10) {
              response.push({name:"More...",href:"/searchResults/all/"+$scope.searchQuery});
              $scope.objsStage = response;
              $scope.vedik="Vediks";
              $scope.searchStage=true;
            }
            else {
              $scope.objsStage = response;
              $scope.searchStage=true;
              $scope.vedik="Vediks";
            }
          }
          if(response.length==0) {
            $scope.objsStage = [];
            $scope.searchStage=false;
             $scope.Stage=0;
            console.log($scope.Stage);
          }
        });
         if($scope.UserList==0 && $scope.club==0 && $scope.stage==0)
         {
            console.log('dsfssdg');
            $scope.noResult=true;
         }
         
       

      }
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    };

    $scope.toggleRight = buildToggler('left');
    $scope.isOpenRight = function(){
      return $mdSidenav('left').isOpen();
    };
    /**
     * Supplies a function that will continue to operate until the
     * time is up.
     */
    function debounce(func, wait, context) {
      var timer;
      return function debounced() {
        var context = $scope,
            args = Array.prototype.slice.call(arguments);
        $timeout.cancel(timer);
        timer = $timeout(function() {
          timer = undefined;
          func.apply(context, args);
        }, wait || 10);
      };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    function buildDelayedToggler(navID) {
      return debounce(function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }, 200);
    }
    function buildToggler(navID) {
      return function() {
        $mdSidenav(navID)
          .toggle()
          .then(function () {
            $log.debug("toggle " + navID + " is done");
          });
      }
    }
  
  // .controller('LeftCtrl', function ($scope, $timeout, $mdSidenav, $log) {
  //   $scope.close = function () {
  //     $mdSidenav('left').close()
  //       .then(function () {
  //         $log.debug("close LEFT is done");
  //       });
  //   };
  // })
  $scope.close = function () {
      $mdSidenav('left').close()
        .then(function () {
          $log.debug("close left is done");
        });
  };
  
});