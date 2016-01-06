'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notFound', {
        url: '/notFound',
        templateUrl: 'app/notFound/notFound.html',
        controller: 'NotFoundCtrl'
      });
  });