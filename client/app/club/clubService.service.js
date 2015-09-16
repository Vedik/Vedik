'use strict';

angular.module('myAppApp')
.factory('ClubEventService',function () {
 			var eId;
 			var cId;
	return { // the function isn't working! Why?? problem with promises??
				setEventId:function setEventId(eventId,clubId) {					
					eId=eventId ;
					cId=clubId;
					
					console.log(eId);
					
				},
				getEventId:function getEventId(){
					return {eventId:eId,clubId:cId};
				}	
			}
	
});