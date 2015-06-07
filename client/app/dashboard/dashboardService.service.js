'use strict';

angular.module('myAppApp')
.service('DashboardService',function DashboardService ($http) {

	return { // the function isn't working! Why?? problem with promises??
		getSlots:function () {
			$http.get('/api/videos');
		}
	};
});