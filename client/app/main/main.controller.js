'use strict';

angular.module('myAppApp')
  .controller('MainCtrl', function ($scope,$state,Auth, $http, socket) {
    $scope.awesomeThings = [];
    if(Auth.isLoggedIn()) {
      $state.go('dashboard');
    }
    else { $state.go('login'); }
    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
      socket.syncUpdates('thing', $scope.awesomeThings);
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });
