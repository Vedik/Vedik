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
  var newComment = new Comment({commentPutter:user.name,commentData:req.body.commentData,videoId:req.body.videoId,datePosted:Date.now(),dateEdited:Date.now()});
  newComment.save(function(err){
    if(err){
      return handleError(res, err);
    }
    else {
      Video.findById(newComment.videoId,function (err,doc){
        if(err){
          return handleError(res, err);
        }
        else {
          doc.comments.push({comment:newComment});
          doc.save(function (err){
            if(err){
              return handleError(res, err);
            }
            else {
              return res.json(newComment);
            }
          });
        }
      });
    }
  });
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  console.log(req.body);
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
    var videoId = comment.videoId;
    var commentId = comment._id;
    comment.remove(function(err) {
      if(err) { return handleError(res, err); }
      Video.findOne({_id:videoId},function (err,doc){
        var i = 0;
        for(i=0;i<doc.comments.length;i++){
          if(doc.comments[i].comment.equals(commentId)){
            doc.comments[i].remove(function (err){
              if(err){handleError(res,err);}
              doc.save(function (err){
                if(err){handleError(res,err);}
                console.log(doc.comments);
                return res.json(doc);
              });
            });
          }
        }
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}