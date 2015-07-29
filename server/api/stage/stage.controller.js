'use strict';

var _ = require('lodash');
var Stage = require('./stage.model');

// Get list of stages
exports.index = function(req, res) {
  Stage.find(function (err, stages) {
    if(err) { return handleError(res, err); }
    return res.json(200, stages);
  });
};

// Get a single stage
exports.show = function(req, res) {
  Stage.findOne({name:req.params.name}, function (err, stage) {
    console.log(req.user._id);
    if(err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    var i =0,isFollowing;
    for(;i<stage.subscribed_users.length;i++){
      if(stage.subscribed_users[i].user.equals(req.user._id)){
        isFollowing = true;
      }
    }
    if(isFollowing!=true){
      isFollowing=false;
    }
    console.log({stage:stage,isFollowing:isFollowing});
    return res.json({stage:stage,isFollowing:isFollowing});
  });
};

// Creates a new stage in the DB.
exports.create = function(req, res) {
  /*Stage.create(req.body, function(err, stage) {
    if(err) { return handleError(res, err); }
    return res.json(201, stage);
  });*/

  var newStage = new Stage({
    name:req.body.name,
    posterUrl:req.body.posterUrl,
    description:req.body.description,
    createdOn:Date.now(),
    subscribed_users:[],
    groups:[],
    admins:[],
    trendingPosts:[],
    bookedPosts:[]
  });
  newStage.save(function (err){
    if(err){
      return handleError(res,err);
    }
    else {
      console.log('The stage is saved as \n'+newStage);
      res.json(newStage);
    }
  });
};

// Updates an existing stage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stage.findById(req.params.id, function (err, stage) {
    if (err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    var updated = _.merge(stage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stage);
    });
  });
};

// Deletes a stage from the DB.
exports.destroy = function(req, res) {
  Stage.findById(req.params.id, function (err, stage) {
    if(err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    stage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.addSubscriber = function (req,res){
  Stage.findOne({name:req.params.name},function (err,stage){
    if(err){
      return handleError(res,err);
    }
    if(!stage) { return res.send(404); }
    stage.subscribed_users.push({user:req.user._id});
    stage.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log(stage);
        return res.json({added:true});
      }
    });  
  });
};
exports.deleteSubscriber = function (req,res){
  Stage.findOne({name:req.params.name},function (err,stage){
    if(err){
      return handleError(res,err);
    }
    if(!stage) { return res.send(404); }
    stage.subscribed_users.pull({user:req.user._id});
    stage.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log(stage);
        return res.json({removed:true});
      }
    });  
  });
};

function handleError(res, err) {
  return res.send(500, err);
}