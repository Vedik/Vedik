'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('viewPage', {
        url: '/viewPage',
        templateUrl: 'app/viewPage/viewPage.html',
        controller: 'ViewPageCtrl',
        params:{'vidCode':null}
      });
  });