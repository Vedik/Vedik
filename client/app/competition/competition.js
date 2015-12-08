'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('competition', {
        url: '/competition/:id',
        templateUrl: 'app/competition/competition.html',
        controller: 'CompetitionCtrl'
      });
  });