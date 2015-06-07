'use strict';

var _ = require('lodash');
var Video = require('./video.model');
var User = require('../user/user.model');
// Get list of videos
exports.index = function(req, res) {
  Video.find(function (err, videos) {
    if(err) { return handleError(res, err); }
    return res.json(200, videos);
  });
};

// Get a single video
exports.show = function(req, res) {
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    return res.json(video);
  });
};

// Creates a new video in the DB.
exports.create = function(req, res) {
  console.log(req.body.genres);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  var newvideo = new Video({
    vidname:req.body.vidname,
    vidurl:req.body.vidurl,
    genres:req.body.genres,
    description:req.body.description,
    posterurl:req.body.posterurl,
    uploader:req.body.uploader,
    view_count:0,
    createdOn:Date.now()
  });
  /*newvideo.save(function (err){
    if(!err) {
        User.findOne({_id:newvideo.uploader},function (error, user){
          if(!err) {
            user.videos.push(newvideo);
            user.save(function (err1){
              if(!err) console.log("no error saving user"+user);
              else console.log(err1);
            });
            console.log("pushed the id");
            console.log(user);
          }
          else console.log("error");
        });
    }
    else {
      console.log('i am getting error as '+err);
    }
  });*/
  newvideo.save(function (err){
    if(err) console.log(err);
    else {
      User.findOne({_id:newvideo.uploader}, function (err, user){
        if(err) {
          console.log(err);
        }
        else {
          console.log(user + "is the doc");
          user.videos.push(newvideo);
          user.save(function (error) {
            if(error) {
              console.log(error);
            }
            else {
              console.log('user saved??');
            }
          })
        }
      })
    }
    res.json(newvideo);
  })

}


// Updates an existing video in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Video.findById(req.params.id, function (err, video) {
    if (err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    var updated = _.merge(video, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, video);
    });
  });
};

// Deletes a video from the DB.
exports.destroy = function(req, res) {
  Video.findById(req.params.id, function (err, video) {
    if(err) { return handleError(res, err); }
    if(!video) { return res.send(404); }
    video.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}