'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile/:name',
        templateUrl: 'app/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });