'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formCreate', {
        url: '/forms/formCreate',
        templateUrl: 'app/forms/formCreate/formCreate.html',
        controller: 'FormCreateCtrl'
      });
  });