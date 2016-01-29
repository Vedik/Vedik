angular.module('myAppApp').controller('TimepickerDemoCtrl', function ($scope, $log) {
  $scope.mytime = new Date();

  $scope.hstep = 1;
  $scope.mstep = 15;

  $scope.options = {
    hstep: [1, 2, 3],
    mstep: [1, 5, 10, 15, 25, 30]
  };

  $scope.ismeridian = true;
  $scope.toggleMode = function() {
    $scope.ismeridian = ! $scope.ismeridian;
  };

  $scope.update = function() {
    var d = new Date();
    d.setHours( 14 );
    d.setMinutes( 0 );
    $scope.mytime = d;
  };

  $scope.changed = function () {
    $log.log('Time changed to: ' + $scope.mytime);
  };

  $scope.clear = function() {
    $scope.mytime = null;
  };
});

angular.module('myAppApp').controller('ModalVideoInstanceCtrl',function ($scope,$modalInstance,Auth,vidCode, videoPost,ratingArray,$http,$document){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };
   $scope.user = Auth.getCurrentUser;
    console.log($scope.user().name);

  $scope.vidCode=vidCode;
 
    $scope.video = videoPost;
    
    var comments=[];
    comments=angular.copy($scope.video.comments);
    $scope.comments=comments;

  $scope.ratingArray = ratingArray;
  $scope.rate=$scope.ratingArray.ratingValue;
  $scope.max = 10;
  $scope.rating=$scope.video.rating;
  $scope.votes=$scope.ratingArray.votes;

  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  }

    $scope.isReadonly = false;

      if(!$scope.ratingArray.rating)
      {
        $scope.userRate=true;
      }
      else
      {
        $scope.userRate=false;
      }

  $scope.ratePost = function(rate) {
        $http.post('/api/posts/rating/'+$scope.video._id,{rating:rate}).success(function (response){
            $scope.votes=response.votes;
            $scope.rating=response.rating;
            $scope.userRate=false;
            console.log($scope.votes+$scope.rating);
  });
};
    
        $http.get('/api/credits/video/'+$scope.video._id).success(function(response){
            console.log(response);
            $scope.credit=response;
           
        });
    

  /*$scope.rating1 = 5;
  $scope.rateFunction = function(rating) {
    console.log("Rating selected: " + rating);
    $http.post('/api/videos/ratings/'+$scope.vidCode,{rating:rating}).success(function (response){
      console.log(response);
      $scope.rating1 = rating;
    })
  };*/

  //////  Comment Functions ////////////////
   $scope.toggleVal = false;

  $scope.submitComment = function (){
      if($scope.commentData===undefined){

      }
      else {
        console.log($scope.commentData);
        $http.post('/api/comments/',{commentData:$scope.commentData,postId:$scope.video._id}).success(function (response){
          $scope.commentData='';
          
          var length=comments.length;
          console.log(response,length);
          var comment=angular.copy(response);
          comments[length]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
        });
      }
    }

    $scope.delete = function (id){
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        comments.splice(index,1);
        console.log(comments);
        $scope.comments=comments;
        
      });
    }
    $scope.edit = function (id,editData,index){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log(response);
        var comment=angular.copy(response);
          comments[index]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
      });
    }

    /////////// comment functions close////////////
    $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });

  $scope.cancel = function () {
    console.log('clsing modal');
    $(document).ready(function() {

          
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        
    });
    
    $modalInstance.dismiss('cancel');

  };
});

angular.module('myAppApp').controller('ModalImageInstanceCtrl',function ($scope,$modalInstance,imagePost,ratingArray,height,$http,Auth){
  console.log('hello');
   $scope.ok = function () {
        $modalInstance.close($scope.selected.item);

    };
    $scope.image=imagePost;  
    $scope.img_viewed = {
        'height': getHeight()+"px"
    };

    var comments=[];
    comments=angular.copy($scope.image.comments);
    $scope.comments=comments;

    $scope.user = Auth.getCurrentUser;
    console.log($scope.user().name);
   
    $scope.ratingArray = ratingArray;
      $scope.rate=$scope.ratingArray.ratingValue;
      $scope.max = 10;
      $scope.rating=$scope.image.rating;
      $scope.votes=$scope.ratingArray.votes;

      $scope.isReadonly = false;

      if(!$scope.ratingArray.rating)
      {
        $scope.userRate=true;
      }
      else
      {
        $scope.userRate=false;
      }
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      }

      $scope.ratePost = function(rate) {
            $http.post('/api/posts/rating/'+$scope.image._id,{rating:rate}).success(function (response){
                $scope.votes=response.votes;
                $scope.rating=response.rating;
                $scope.userRate=false;
                console.log($scope.votes+$scope.rating+"sdfgbfbh"+$scope.userRate);
        });
      };

    $scope.img_viewed_info = {
        'width': getWidth()+"px"
    };

    function getHeight() {
            return (window.innerHeight * .90);
        }
    function getWidth() {
            return (100);
        }

    $http.get('/api/credits/video/'+$scope.image._id).success(function(response){
            console.log(response);
            $scope.credit=response;
           
        });

    $scope.submitComment = function (){
      if($scope.commentData===undefined){

      }
      else {
        console.log($scope.commentData);
        $http.post('/api/comments/',{commentData:$scope.commentData,postId:$scope.image._id}).success(function (response){
          $scope.commentData='';
          
           var length=comments.length;
          console.log(response,length);
          var comment=angular.copy(response);
          comments[length]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
        });
      }
    }

    $scope.delete = function (id,index){
      $http.delete('/api/comments/'+id).success(function (response){
        console.log(response);
        
        
        
        comments.splice(index,1);
        console.log(comments);
        $scope.comments=comments;
        
      });
    }
    $scope.edit = function (id,editData,index){
      console.log(editData);
      $http.put('/api/comments/'+id,{commentData:editData}).success(function (response){
        console.log(response);
       
          var comment=angular.copy(response);
          comments[index]={'comment':comment};
          console.log(comments);
          $scope.comments=comments;
      });
    }


    $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });
        
      $scope.cancel = function () {
        $(document).ready(function() {
                $("#for_blur").css("filter", 'blur(0px)'); 
        });
        $modalInstance.dismiss('cancel');
      };
});

/*******************************Booking modal******************************************/

angular.module('myAppApp').controller('ModalBookADayInstanceCtrl',function ($scope,$modalInstance,bookingPostId,$http){
  console.log('hello');
   $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    };
    $scope.postId=bookingPostId;  
  
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var dateTdy;

    $scope.today = function() {
    dateTdy= new Date();

    var d = dateTdy.getDate();
    var m = dateTdy.getMonth()+1;
    var y = dateTdy.getFullYear();
    var month=["January","February","March","April","May","June","July","August","September","October","November","December"]
    $scope.dtNumeric=d+"-"+m+"-"+y;
    $scope.dt=d+"-"+month[m-1]+"-"+y;
    $scope.dt2=$scope.dt;
  };
  $scope.today();

  

    $scope.bookPost=function(){

        if($scope.dt2!=$scope.dt)
        {
          var date = $scope.dt ;
          var dd = date.getDate();
          var mm = date.getMonth()+1;
          var yy = date.getFullYear();
          var bookingDate=date;
        }
        else
          var bookingDate=dateTdy;
          bookingDate.setSeconds(0);
          bookingDate.setHours(0);
          bookingDate.setMinutes(0);
          var startDate=new Date(bookingDate.valueOf());
          startDate.setDate(startDate.getDate()-1);
          console.log($scope.bookedDates);
           $scope.noRepeat=true;
          for(var i=0;i<$scope.bookedDates.length;i++)
          {  
        
             var date =bookingDate;

              var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
          
              var d = date.getDate();
              var m = date.getMonth();
              var y = date.getFullYear();
              var bookedDate = d+"-"+month[m]+"-"+y;
            if($scope.bookedDates[i].bookedFor==bookedDate)
              {
                 $scope.noRepeat=false;
                 
                 break;
              }
          }
          if($scope.noRepeat && $scope.bookedDates.length!=4)
          {
              $http.post('/api/bookings/'+$scope.postId,{bookingDate:bookingDate,startDate:startDate}).success(function (response){
                  console.log(response);
                  $scope.bookedDates.push(response);
                  console.log($scope.bookedDates);
                   $scope.checkRepeat=false;
          })
          }
          else{
            $scope.checkRepeat=true;
            console.log("repeated");
            
              }
    };

    $http.get('/api/bookings/post/'+$scope.postId).success(function(response){
      $scope.bookedDates=[];
        for(var i=0;i<response.length;i++)
        {
          $scope.bookedDates[i]=response[i];
        }
        console.log($scope.bookedDates);

    });
        


    // $scope.maxFour= function(givenDate){

    //     console.log('Deleted');
    // };
    
     

    $scope.unbook = function(id,index){
        $http.delete('/api/bookings/deleteBooking/'+id).success(function(response){
            console.log('Deleted');
            $scope.bookedDates.splice(index,1);
        })
    }


     $scope.ok = function () {
        $modalInstance.close($scope.postId);
      };

    $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  // $scope.disabled = function(date, mode) {
  //   if ($scope.bookedDates.length>3)
  //     return true;
  //  else if(mode === 'day')
  //   {

        
  //     console.log($scope.bookedDates.length);
  //     for(var i=0;i<$scope.bookedDates.length;i++)
  //     {
  //       console.log("dertf");
       
  //       if(date == $scope.bookedDates[i].bookedFor)
  //         {
  //            console.log("dertf");
  //         return true;
  //          }   
  //     }
  //   }
  // };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.openED = function($event) {    //OpenEndDate
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedED = true;
  };
  $scope.openSD = function($event) {    //OpenStart Date
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openedSD = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 2);
  $scope.events =
    [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];






  $scope.getDClass = function(date, mode) {
     console.log(date,mode);

    if (mode === 'day') {
      console.log(date);
       
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };


  $(document).keyup(function(e) {

         if (e.keyCode==27) { 
            $("#for_blur").css("filter", 'blur(0px)'); 
             
        }
    });
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('myAppApp').controller('ConfirmCreditCtrl',function ($scope,$modalInstance,postId,credits,name,$http){
  console.log('hello');
  
    $scope.name=name;
    $scope.credits=credits;
   


    $scope.confirmYes=function(){
        
      
        $http.put('/api/credits/confirm/'+postId,{confirm:true}).success(function(response){
            $modalInstance.dismiss('cancel');
        })
    };
    $scope.confirmNo=function(){
        
      
        $http.put('/api/credits/confirm/'+postId,{confirm:false}).success(function(response){
            $modalInstance.dismiss('cancel');
        })
    };

 
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

