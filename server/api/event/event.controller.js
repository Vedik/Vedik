'use strict';

var _ = require('lodash');
var Event = require('./event.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');

// Get list of events
exports.index = function(req, res) {
  Event.find(function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  });
};

exports.clubEvents = function(req, res) {
  Event.find({club:req.params.clubId},function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  });
};

// Get a single event
exports.show = function(req, res) {
  console.log('req.params.id');
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
  })
  .populate('user club')
  .exec(function (err,event){
    if(err) { return handleError(res, err); }

    if(!event) { return res.send(404); }

    console.log(event);
    return res.json(event);
   
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
   console.log(req.params.id);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/

  var a=req.body.vedik;
  console.log(a[1]);
  var b=[];
  for(var i=0;i<a.length;i++)
  {
    b[i]=a[i]._id;
  }

  var newEvent = new Event({
    name:req.body.name,
    description:req.body.description,
    startDate:req.body.StartDate,
    endDate:req.body.endDate,
    club:req.params.id,
    user:req.user._id,
    
  });
 

  newEvent.save(function (err){
 
    if(err) {return handleError(res, err); }
    else {
  
          
         
          var newPost = new Post({
            eventId: newEvent._id,
            tags:req.body.tags,
            type:30,                         //7=club event
            uploader:{user:req.user._id},
            uploaderClub:req.params.id,
            view_count:0,
            like:[],
            createdOn:Date.now()
          });
          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          
          newPost.save(function(err){
            if(err) {return handleError(res,err);}

            else {
              console.log('post created');
            }
          });

          
          return res.json(200,newEvent);
        }
    
    });
};


// Updates an existing event in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Event.findById(req.params.id, function (err, event) {
    if (err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    var updated = _.merge(event, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, event);
    });
  });
};

// Deletes a event from the DB.
exports.destroy = function(req, res) {
  Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
    if(!event) { return res.send(404); }
    event.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}