'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Event = require('./event.model');
var Post = require('../post/post.model');
var Entry = require('../entry/entry.model');
var User = require('../user/user.model');
var Credit = require('../credit/credit.model');

// Get list of events
exports.index = function(req, res) {
  var startDate=new Date();
  startDate.setSeconds(0);
  startDate.setHours(0);
  startDate.setDate(startDate.getDate()-1);
  startDate.setMinutes(0);
  var endDate=new Date();
  endDate.setSeconds(0);
  endDate.setHours(0);
  endDate.setDate(endDate.getDate());
  endDate.setMinutes(0);

 console.log(startDate)
  Event.find({$or :[{'startDate':{$gte: endDate}}]},function (err, events) {
    if(err) { return handleError(res, err); }
        
        var x=[];

                Event.find({$or :[{'startDate':{$gte: startDate,$lt:endDate}}]},function (err, tEvents) {
                   if(err) { return handleError(res, err); }
                   x=tEvents;
                   console.log(events);

                   return res.json(200, {events:events,tEvents:tEvents});
      
                });
            

  });
};
  

exports.clubEvents = function(req, res) {
  Event.find({club:req.params.clubId},function (err, events) {
    if(err) { return handleError(res, err); }
    return res.json(200, events);
  });
};

// Get a single event
exports.eventShow = function(req, res) {
  console.log('req.params.id');
    Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
  })
  .populate('user club attending.user ')
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
exports.compShow = function(req, res) {
  console.log('req.params.id');
    Event.findById(req.params.id, function (err, event) {
    if(err) { return handleError(res, err); }
  })
  .populate('user club attending.user entries.entry entries.user')
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
    var submitted=false;
    console.log(event.entries);
    for(var i=0; i<event.entries.length;i++)
    {
        if(!event.entries[i].user){console.log('jfj')}
        else if(event.entries[i].user._id.equals(req.user._id)){

          submitted=true;
          break;
        }
    }
      
   

 
    console.log(event,attending,submitted);
    return res.json({event:event,submitted:submitted,attending:attending});
   
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

exports.subEntry = function(req, res) {
  console.log(req.params.id);
  Event.findById(req.params.id,function (err,event){
    if(err) return handleError(res,err);

    var newEntry= new Entry({
      entry:req.body.entry,
      user:req.user._id,
      rating:0,
      createdOn:Date.now(),
    })
    console.log(req.body.attending);
    event.entries.push({entry:newEntry._id,user:req.user._id});
    if(!req.body.attending){
      event.attending.push({user:req.user._id});
    }
    newEntry.save(function (err) {
      if(err) return handleError(res, err);
    })
      event.save(function (err) {
        var attending=true;
        if(err) return handleError(res, err);
        console.log('submited'+attending);
        return res.json({event:event,attending:attending});
      })
  })
};

exports.declareRes = function(req, res) {
  
  Event.findById(req.params.id,function (err,event){
    if(err) return handleError(res,err);

   
   
    
      event.winners.push({position:req.body.num,user:req.body.user._id});
    


       var newPost = new Post({
          eventId: event._id,      
          type:50,
          uploader:{user:req.body.user._id},
          uploaderClub:event.club,
          position:req.body.position,
          like:[],
          createdOn:Date.now()
        });
      
    
      

      newPost.save(function (err) {
          if(err) return handleError(res, err);
          console.log('postsaved');
          
      })
      User.findById(req.body.user._id,function (err,user){
              if(err) return handleError(res, err);
              console.log(newPost);
              user.unseenNotifs.push(newPost._id);
              user.save(function (err){
                  if(err) return handleError(res, err);
                  console.log('notifadded');
              })
          });
      
      var newCredit =  new Credit({
          postId:newPost._id,
          credit:mongoose.Types.ObjectId('568143ea40c6fb6d1eb3ba4a'),
          creditedUsers:[]
        });

        
          newCredit.creditedUsers.push({user:req.body.user._id});
        
        newCredit.save(function(err){
        if(err) return handleError(res,err);
        console.log(newCredit);
      })
      
    
      event.save(function (err) {
        var attending=true;
        if(err) return handleError(res, err);
       
        return res.json(event);
      })
  })
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