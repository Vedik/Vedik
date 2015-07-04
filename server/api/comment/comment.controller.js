'use strict';

var _ = require('lodash');
var Comment = require('./comment.model');
var Video = require('../video/video.model');
// Get list of comments
exports.index = function(req, res) {
  Comment.find(function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.json(200, comments);
  });
};

// Get a single comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  var user = req.user;
  console.log(req.body);
  var newComment = new Comment({commentPutter:user,commentData:req.body.commentData,videoId:req.body.videoId});
  newComment.save(function(err){
    if(err){
      console.log(err);
    }
    else {
      console.log('dddddddddd     '+newComment+'          ddddddddddddddddddd');
      Video.findById(newComment.videoId,function (err,doc){
        if(err){
          console.log('error is '+err);
        }
        else {
          doc.comments.push({comment:newComment});
          doc.save(function (err){
            if(err){
              console.log(err+' will be this');
            }
            else {
              console.log('updated doc is '+doc)
              res.json(newComment);
            }
          });
        }
      });
    }
  });
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.send(404); }
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}