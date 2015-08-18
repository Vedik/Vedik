'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('club', {
        url: '/club',
        templateUrl: 'app/club/club.html',
        controller: 'ClubCtrl'
      });
  });

 