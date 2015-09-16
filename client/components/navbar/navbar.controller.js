'use strict';

angular.module('myAppApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth,$http) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];
    var pendingTask;
    $scope.isCollapsed = true;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
    console.log($scope.getCurrentUser().name);

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
  });