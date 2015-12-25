'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('welcomeUser', {
        url: '/welcomeUser',
        templateUrl: 'app/welcomeUser/welcomeUser.html',
        controller: 'WelcomeUserCtrl'
      });
  });