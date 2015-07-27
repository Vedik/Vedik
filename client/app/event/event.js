'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('event', {
        url: '/event/:name',
        templateUrl: 'app/event/event.html',
        controller: 'EventCtrl'
      });
  });