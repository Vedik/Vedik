'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/event/:id',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });