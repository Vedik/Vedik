'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('fest', {
        url: '/fest',
        templateUrl: 'app/fest/fest.html',
        controller: 'FestCtrl'
      });
  });