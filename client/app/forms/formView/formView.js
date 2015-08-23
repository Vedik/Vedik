'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formView', {
        url: '/forms/formView',
        templateUrl: 'app/forms/formView/formView.html',
        controller: 'FormViewCtrl'
      });
  });