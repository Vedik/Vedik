'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewPage', {
        url: '/viewPage/:id',
        templateUrl: 'app/viewPage/viewPage.html',
        controller: 'ViewPageCtrl'
      });
  });