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
    console.log($scope.getCurrentUser);

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.change = function(){
      if(pendingTask) {
      clearTimeout(pendingTask);
      }
      $scope.objs = [];
      pendingTask = setTimeout(fetch, 300);
    };

    function fetch () {
      if($scope.searchQuery.length!=0) {
        $http.get('/api/users/search/'+$scope.searchQuery).success(function (response) {
          if(response) {
            if(response.length==10) {
              response.push({name:"More...",href:"/searchResults/all/"+$scope.searchQuery});
              $scope.objs = response;
            }
            else {
              $scope.objs = response;
            }
          }
          if(response.length==0) {
            $scope.objs = [{name:"No Users with the above name",href:'#'}];
          }
        })
      }
    }

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });