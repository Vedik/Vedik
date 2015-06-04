'use strict';

angular.module('myAppApp')
.service('DashboardService',function DashboardService ($http) {

	return { // the function isn't working! Why?? problem with promises??
		getSlots:function () {
			var a =[
            {
    	       vidname:"hello bro",
    	       poster:"http://i.stack.imgur.com/ngShY.png?s=48&g=1"
            },
            {
    	       vidname:"sorry bro",
    	       poster:"http://i.stack.imgur.com/ngShY.png?s=48&g=1"
            },
            {
    	       vidname:"happy bro",
    	       poster:"http://i.stack.imgur.com/ngShY.png?s=48&g=1"
            }];
            return a;
		}
	}
});