'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('stage', {
        url: '/stage/:name',
        templateUrl: 'app/stage/stage.html',
        controller: 'StageCtrl'
      });
  });