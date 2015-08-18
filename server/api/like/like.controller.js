'use strict';

var _ = require('lodash');
var Like = require('./like.model');
var Post = require('../post/post.model');



exports.like = function (req,res){
  Like.findOne({id:req.params.postId},function (err,like){
    if(err){
      return handleError(res,err);
    }
    
    like.like.push({user:req.user._id});
    like.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log(like);
        return res.json({added:true});
      }
    });  
  });
};
exports.unlike = function (req,res){
  Like.findOne({id:req.params.postId},function (err,like){
    if(err){
      return handleError(res,err);
    }
    
    var i =0;
    for(;i<like.like.length;i++){
      if(like.like[i].user.equals(req.user._id)){
        like.like[i].remove(function (err){
          if(err){ return handleError(res,err);}
          else{
            like.save(function (err){
              if(err){ return handleError(res, err);}
              else {
                console.log(like);
                return res.json({removed : true});
              }
            });
          }
        })
      }
    } 
  });
};

// Get list of likes
exports.index = function(req, res) {
  Like.find(function (err, likes) {
    if(err) { return handleError(res, err); }
    else
    { 
      var i,j;
      for(j=0;j<likes.length;i++)
      {
          for(var i=0;i<likes[j].like.length;i++)
              {
                  likes[j].liking=false;
                if(likes[j].like[i].equals(req.user._id))
                {
                  likes[j].liking=true;
                  break;
                }
              }
      }
        res.json(likes);
        console.log(likes);
    }
  });
};

// Get a single like
exports.show = function(req, res) {
 // console.log(req.params.postId);
  
  
  Like.findOne({id:req.params.postId}, function (err, like) {

        var liked;
    if(err) { return handleError(res, err); }
   if(!like) { return res.status(404).send('Not Found'); }

    

    if(like.like.length==0)
    {
      liked=false;
      
    }
    else
    {
      for(var i=0;i<like.like.length;i++)
      {
        if(like.like[i].equals(req.user._id))
        {
          liked=true;
          break;
        }
        else
           liked=false;;
      }
      

    }

      console.log(liked);
      return res.json(liked);
    

  });
};

// Creates a new like in the DB.
exports.create = function(req, res) {
  Like.create(req.body, function(err, like) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(like);
  });
};

// Updates an existing like in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Like.findById(req.params.id, function (err, like) {
    if (err) { return handleError(res, err); }
    if(!like) { return res.status(404).send('Not Found'); }
    var updated = _.merge(like, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(like);
    });
  });
};

// Deletes a like from the DB.
exports.destroy = function(req, res) {
  Like.findById(req.params.id, function (err, like) {
    if(err) { return handleError(res, err); }
    if(!like) { return res.status(404).send('Not Found'); }
    like.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}