'use strict';

angular.module('myAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('formTemplates', {
        url: '/forms/formTemplates',
        templateUrl: 'app/forms/formTemplates/formTemplates.html',
        controller: 'FormTemplatesCtrl'
      });
  });