'use strict';

angular.module('myAppApp')
  .service('UploadPortalService', function UploadPortalService ($http) {

  	return {
  		submitForm : function (form) {
  			return $http.post('/api/videos',form).then(function (response){
  				return response.data;
  			});
  		}
  	};

  });
