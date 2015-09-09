'use strict';

angular.module('myAppApp')
  .service('UploadPortalService', function UploadPortalService ($http) {

  		var for_blur="";

  	return {
	  		submitForm : function (form) {
	  			return $http.post('/api/videos',form).then(function (response){
	  				return response.data;
	  			});
	  		},
  		
            getProperty: function () {
                return for_blur;
            },
            setProperty: function(value) {
                for_blur='my-class';
            }

  		
  	};

  });
