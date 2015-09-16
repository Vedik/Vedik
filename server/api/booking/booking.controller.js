'use strict';

var _ = require('lodash');
var Booking = require('./booking.model');
var Post = require('../post/post.model');
var Article = require('../article/article.model');
var Image = require('../image/image.model');


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
      var posts=[];
           var postsNew=[];
           var a=[];
      
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
           if (err) return handleError(err);
           var posts=[];
           var postsNew=[];
           var a=[];
           for(var i=0;i<bookings.length;i++)
           {
            if(bookings[i].postId.type==1)
            {
                var options = {
                path: 'postId.articleId',
                model: 'Article'
              }
            }
            else if(bookings[i].postId.type==2)
            {   console.log('image');
                var options={
                path: 'postId.imageId',
                model: 'Image'
              };
              
            }
            else if(bookings[i].postId.type==3)
            {
                var options={
                path: 'postId.videoId',
                model: 'Video'
              };
            } 

              Booking.populate(bookings[i], options, function (err, post){
             
                  posts=JSON.parse(JSON.stringify(post));
                   postsNew[i] = function(posts) {
                    if (posts != null && typeof(posts) != 'string' &&
                      typeof(posts) != 'number' && typeof(posts) != 'boolean' ) {
                      //for array length is defined however for objects length is undefined
                      if (typeof(posts.length) == 'undefined') { 
                        delete posts._id;
                        for (var key in posts) {
                          postsNew[i](posts[key]); //recursive del calls on object elements
                        }
                      }
                      else {
                        for (var j = 0; j < posts.length; j++) {
                          postsNew[i](posts[j]);  //recursive del calls on array elements
                        }
                      }
                    }
                  } 
                  a[i]=posts;
                  

              });
           }
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
              
            res.json({a:a});
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

