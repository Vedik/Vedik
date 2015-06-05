'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('uploadPortal', {
        url: '/uploadPortal',
        templateUrl: 'app/uploadPortal/uploadPortal.html',
        controller: 'UploadPortalCtrl'
      });
  });