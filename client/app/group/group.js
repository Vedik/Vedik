'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('group', {
        url: '/group',
        templateUrl: 'app/group/group.html',
        controller: 'GroupCtrl'
      });
  });