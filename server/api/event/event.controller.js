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
 console.log('req.params.id');console.log('req.params.id');console.log('req.params.id');
    Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
  })
  .populate('user club attending.user')
  .exec(function (err,event){
    if(err) { return handleError(res, err); }

    if(!event) { return res.send(404); }
    var attending=false;
    for(var i=0; i<event.attending.length;i++)
    {
        if(event.attending[i].user._id.equals(req.user._id)){

          attending=true;
          break;
        }
    }
      
   

 
    console.log(event,attending);
    return res.json({event:event,attending:attending});
   
  });
};

// Creates a new event in the DB.
exports.create = function(req, res) {
 
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
  if(req.body.endDate){
      var newEvent = new Event({
      name:req.body.name,
      description:req.body.description,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      club:req.params.id,
      user:req.user._id,
      eventCover:req.body.eventCover,
      location:req.body.location,
      regReq:req.body.regReq,
      comp:req.body.comp,
      subOnl:req.body.subOnl,
      subType:req.body.subType,
    });
  }
  
  
  else
  {
      var newEvent = new Event({
        name:req.body.name,
        description:req.body.description,
        startDate:req.body.startDate,
        club:req.params.id,
        user:req.user._id,
        eventCover:req.body.eventCover,
        location:req.body.location,
        regReq:req.body.regReq,
        comp:req.body.comp,
        subOnl:req.body.subOnl,
        subType:req.body.subType,
        
      });
  }
 
    for(i=0;i<b.length;i++)
    {
      newEvent.vedik.push({vedik:b[i]});
    }

  newEvent.save(function (err){
 
    if(err) {return handleError(res, err); }
    else {
  
          
         
          // var newPost = new Post({
          //   eventId: newEvent._id,
          //   tags:req.body.tags,
          //   type:30,                         //7=club event
          //   uploader:{user:req.user._id},
          //   uploaderClub:req.params.id,
          //   view_count:0,
          //   like:[],
          //   createdOn:Date.now()
          // });
          
          
          // newPost.save(function(err){
          //   if(err) {return handleError(res,err);}

          //   else {
          //     console.log('post created');
          //   }
          // });

          
          return res.json(200,newEvent);
        }
    
    });
};
exports.attendInfo = function(req, res) {
  Event.findById(req.params.id,function (err,event){
    if(err) return handleError(res,err);
    var attending=false;
    for(var i=0; i<event.attending.length;i++)
    {
        console.log(event.attending);
        if(event.attending[i].user.equals(req.user._id)){

          attending=true;
          break;
        }
    }
    return res.json(attending);
  })
};
exports.addAttend = function(req, res) {
  console.log(req.params.id);
  Event.findById(req.params.id,function (err,event){
    if(err) return handleError(res,err);
    event.attending.push({user:req.user._id});
      event.save(function (err) {
        console.log(event.attending);
        if(err) return handleError(res, err);
        return res.json(event.attending.length);
      })
  })
};
exports.unAttend = function (req,res){
  console.log(req.params.id);
  Event.findById(req.params.id,function (err,event){
    if(err){
      return handleError(res,err);
    }
    if(!event) { return res.send(404); }
    var i =0;
    for(;i<event.attending.length;i++){
      if(event.attending[i].user.equals(req.user._id)){
        event.attending[i].remove(function (err){
          if(err){ return handleError(res,err);}
          else{
            event.save(function (err){
              if(err){ return handleError(res, err);}
              else {
                console.log(event.attending);
                return res.json(event.attending.length);
              }
            });
          }
        })
      }
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