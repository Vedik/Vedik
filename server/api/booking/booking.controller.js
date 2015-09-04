'use strict';

var _ = require('lodash');
var Booking = require('./booking.model');
var Post = require('../post/post.model');
var Article = require('../article/article.model');

// Get list of bookings
exports.index = function(req, res) {


 /* Booking.find(function (err, bookings) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(bookings);
  });*/
  /*Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .populate('articleId videoId imageId uploader.user uploader.club')
  
  .exec(function (err, posts){
      if (err) return handleError(err);*/
      
      
      var todaysDate=req.params.bookingDate;
      console.log(todaysDate);


         Booking.find({bookedFor:todaysDate},function (err, bookings) {
       var sequence= bookings.length;
      

     /*  var i=0;
       var posts ={};
       for(i; i<bookings.length;i++)
       {  */ 

        
            
        })
         .lean()
        .populate({ path : 'postId'})
        
        .exec(function (err, bookings){
              var options = {
                path: 'postId.articleId',
                model: 'Article'
              };

              if (err) return handleError(err);
              Booking.populate(bookings, options, function (err, posts){
                console.log(posts);
                res.json(posts);
              });
           
             /*Post.populate(booking,'articleId',function (err, booking ){
              
             });*/
            
            });

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
console.log(req.body.bookingDate);

  Booking.find({bookedFor:req.body.bookingDate},function (err, bookings) {
       var sequence= bookings.length;
       console.log(bookings.length);

  
  console.log('d');
  var newBooking = new Booking({
    sequence:sequence + 1,
    bkngCreatedOn:{type:Date,default:Date.now()},
    user:req.user._id,
    postId:req.params.post_id,
    bookedFor:req.body.bookingDate
  });
  console.log('d');
      newBooking.save(function (err){
        if(err){console.log('d');
         return handleError(res, err); }
        else {
          console.log('done');
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

