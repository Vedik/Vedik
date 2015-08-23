'use strict';

var _ = require('lodash');
var Video = require('./video.model');
var User = require('../user/user.model');
var mongoose = require('mongoose');
// Get list of videos
exports.index = function(req, res) {
  Video.find(function (err, videos) {
    if(err) { return handleError(res, err); }
    return res.json(200, videos);
  });
};

// Get a single video
exports.show = function(req, res) {
  console.log(req.params.vidCode);
  Video.findOne({vidurl:'https://www.youtube.com/watch?v='+req.params.vidCode})
  .populate('comments.comment')
  .populate('comments.comment.commentPutter')
  .exec(function (err, video){
    if(err) {
      console.log('this is error '+err);
      next(err);
    }
    else {
    console.log(video+' is the real erroor');
    console.log(video.comments);
    res.json(video);

  }
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
          user.videos.push({video:newvideo,role:['actor']});
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

exports.rate = function(req, res, next) {
  var id = req.user._id;
  var vidCode = req.params.vidCode;
  console.log(req.body.rating);
  var vidurl = 'https://www.youtube.com/watch?v='+vidCode;
  Video.findOne({vidurl:vidurl}, function (err, docs){
    if(err) {
      console.log(err+'is the error');
    }
    else {
      User.findOne({'_id':req.user._id, 'RatedVids.videoId':docs._id},function (err,user){
        if(err) {
          console.log(err);
          res.send(401);
        }
        else {
          /*if(!user) {
            docs.vidRating = (docs.vidRating*docs.votes+req.body.rating)/(docs.votes+1);
            docs.votes= docs.votes+1;
            req.user.RatedVids.push({videoId:docs,Rating:req.body.rating});
            user = req.user;
          }
          else {
            var index;
            for(var i=0;i<user.RatedVids.length;i++){
              if(user.RatedVids[i].videoId.equals(docs._id)){
                index = i;
                user.RatedVids[index].Rating=req.body.rating;
                break;
              }
            }
            docs.vidRating = (docs.vidRating*(docs.votes)+req.body.rating-user.RatedVids[index].Rating)/(docs.votes);
             
          }
          docs.save(function (err){
            if(err) {
              console.log(err);
            }
            else {
              console.log('updated doc is'+docs);
              res.json({vidRating:docs.vidRating,votes:docs.votes}); //to update votes and vidRatings on putting rating
            }
          });
          user.save(function (err){
            if(err) {
              console.log(err);
            }
            else {
              console.log(user);
            }
          });*/
          var i=0;
      var user = req.user;
      var isFound = false;
      for(i=0;i<user.RatedVids.length;i++){
        if(user.RatedVids[i].videoId.equals(docs._id)){
          docs.vidRating = (docs.vidRating*docs.votes+req.body.rating-user.RatedVids[i].Rating)/(docs.votes);
          user.RatedVids[i].Rating = req.body.rating;
          isFound = true;
          break;
        }
      }
      if(!isFound){
        user.RatedVids.push({Rating:req.body.rating,videoId:docs._id});
        docs.vidRating = (docs.vidRating*docs.votes + req.body.rating)/(docs.votes+1);
        docs.votes++;
      }

    user.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else {
        console.log(user+' is saved as thus');
      }
    });
    docs.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else {
        console.log(docs.vidRating+' is saved as thus');
      }
    });
        }
      });
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}