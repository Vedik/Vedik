var todaysDate;
'use strict';

var _ = require('lodash');
var Booking = require('./booking.model');
var Post = require('../post/post.model');
var Article = require('../article/article.model');
var Image = require('../image/image.model');


// Get list of bookings
exports.index = function(req, res) {
  var startDate=new Date();
  startDate.setDate(startDate.getDate()-1);
  var endDate=new Date();
  console.log(startDate,endDate);

      var bPosts=[];
         Booking.find({bookedFor:{$gte: startDate,$lt:endDate}},function (err, bookings) {
       var sequence= bookings.length;
            for(var i=0;i<bookings.length;i++)
            {
                bPosts[i]=bookings[i].postId;
            }
      
            console.log(bPosts);
            Post.find({
                        '_id': { $in: bPosts}
                      },function (err, posts) {
              if(err) { return handleError(res, err); }
              })
            .populate('articleId videoId imageId uploader.user uploaderClub eventId comments.comment like.like')
            
            .exec(function (err, posts){
                if (err) return handleError(err);

                
                //console.log(posts);
                
                return res.json(posts);
  });
     /*  var i=0;
       var posts ={};
       for(i; i<bookings.length;i++)
       {  */ 

        
            
        });
        
              /*var options = {
                path: 'postId.articleId',
                model: 'Article'
              };
              var options2={
                path: 'postId.imageId',
                model: 'Image'
              };*/

             
              /*Booking.populate(bookings, options2, function (err, posts){
                console.log(posts);
                res.json(posts);
              });*/
              
           

        /*}*/
        



        
    

};

// Get a single booking
exports.show = function(req, res) {
  Booking.findById(req.params.id, function (err, booking) {
    if(err) { return handleError(res, err); }
    if(!booking) { return res.status(404).send('Not Found'); }
    return res.json(booking);
  });
};

// Creates a new booking in the DB.
exports.create = function(req, res) {
 /* Booking.create(req.body, function(err, booking) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(booking);
  });*/
  var bookingDate=req.body.bookingDate;
  console.log(bookingDate);
  var startDate=req.body.startDate;
  var endDate=bookingDate;
  
  Booking.find({bookedFor:{$gte: startDate,$lt:endDate}},function (err, bookings) {
       var sequence= bookings.length;
       console.log(bookings.length);

  
  console.log('d');
  var newBooking = new Booking({
    sequence:sequence + 1,
    bkngCreatedOn:{type:Date,default:Date.now()},
    user:req.user._id,
    postId:req.params.post_id,
    bookedFor:bookingDate
  });
  console.log('d');
      newBooking.save(function (err){
        if(err){console.log('d');
         return handleError(res, err); }
        else {
          console.log('done');
          var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
          var booking;
          var date = newBooking.bookedFor;
          var d = date.getDate();
          var m = date.getMonth();
          var y = date.getFullYear();
          booking=d+"-"+month[m]+"-"+y;
     
          return res.json({bookedFor:booking,_id:newBooking._id});
        };
      });
    });
};

// Updates an existing booking in the DB.
exports.update = function(req, res) {
  /*if(req.body._id) { delete req.body._id; }
  Booking.findById(req.params.id, function (err, booking) {
    if (err) { return handleError(res, err); }
    if(!booking) { return res.status(404).send('Not Found'); }
    var updated = _.merge(booking, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(booking);
    });
  });*/
   
   var bc=req.params.bookingCheckbox.concat(); //bc = booking checkbox
   var bcArray=bc.split(",");
   console.log(bcArray[1]);
   console.log('bookingCheckbox');
  
};

// Deletes a booking from the DB.
exports.destroy = function(req, res) {
  console.log(req.body.date);
  if(req.params.date){
    var startDate=new Date(req.body.date);
    startDate.setDate(startDate.getDate()-1);
    var endDate=new Date(req.body.date);
    endDate.setDate(endDate.getDate());
  }
  else{
    var startDate=new Date();
    startDate.setDate(startDate.getDate()-1);
    var endDate=new Date();
    endDate.setDate(endDate.getDate());
  }
  console.log(req.params.postId);
  var startDate=new Date();
  startDate.setDate(startDate.getDate()-1);
  var endDate=new Date();
  endDate.setDate(endDate.getDate());

    Booking.remove({$and:[{bookedFor:{$gte: startDate,$lt:endDate}},{postId:req.params.postId}]},function(err) {
      if(err) { return handleError(res, err); }
      console.log('here');
      return res.status(204).send('No Content');
    });
  
};

exports.deleteBooking = function(req, res) {
  Booking.findById(req.params.id, function (err, booking) {
    if(err) { return handleError(res, err); }
    if(!booking) { return res.status(404).send('Not Found'); }
    booking.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}






// exports.editBooking = function(req, res) {


//      var postId =req.params.postId 
     
     
//          Booking.find({'postId':postId},function (err, bookings) {

//             if(err) { return handleError(res, err); }
      
//         return res.json(bookings);
        
            
//         });
        

// };

exports.sendBookedDates = function(req, res) {
    console.log('here');

     var postId =req.params.postId 
     
     
         Booking.find({'postId':postId},'bookedFor',function (err, bookings) {
            var month=["January","February","March","April","May","June","July","August","September","October","November","December"];
            var booking=[];
            if(err) { return handleError(res, err); }
            for(var i=0;i<bookings.length;i++){
                var date = bookings[i].bookedFor;
                var d = date.getDate();
                var m = date.getMonth();
                var y = date.getFullYear();
                booking.push({_id:bookings[i]._id,bookedFor:d+"-"+month[m]+"-"+y});
                console.log(booking[i].bookedFor);
            }

  
   
 

        return res.json(booking);
        
            
        });
        

};

