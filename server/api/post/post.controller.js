'use strict';

var _ = require('lodash');
var Post = require('./post.model');
// Get list of posts
exports.index = function(req, res) {
  console.log('err');
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .populate('articleId videoId imageId like uploader.user uploader.club')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er2');
      
      return res.json(posts);
  })
};

// Get a single post
exports.showForUser = function(req, res) {
  console.log('req.params.');
  var user_id = req.params.id;
  var query = {};
  query['uploader.' + 'user'] = user_id;
  Post.find(query,function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .populate('articleId videoId imageId like uploader.user')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er12');
      
      return res.json(posts);
  })
};

exports.showForClub = function(req, res) {
  console.log(req.params.id);
   var club_id = req.params.id;
  var query = {};
  query['uploader.' + 'club'] = club_id;
  Post.find(query,function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .populate('articleId videoId imageId like uploader.club')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er2');
      
      return res.json(posts);
  })
};

// Creates a new post in the DB.
exports.create = function(req, res) {
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); }
    return res.json(201, post);
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.send(404); }
    post.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};


exports.like = function (req,res){
  console.log(req.params.postId);
  console.log('dfsdfbv');
  Post.findOne({ $or: [ { articleId:req.params.postId }, { videoId:req.params.postId }, { imageId:req.params.postId } ] },function (err,post){
    if(err){
      return handleError(res,err);
    }
    
    post.like.push({user:req.user._id});
    post.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log('liked');
        return res.json({added:true});
      }
    });  
  });
};
exports.unlike = function (req,res){
  Post.findOne({ $or: [ { articleId:req.params.postId }, { videoId:req.params.postId }, { imageId:req.params.postId } ] },function (err,post){
    if(err){
      return handleError(res,err);
    }
    
    var i =0;
    for(i;i<post.like.length;i++)
    {
      if(post.like[i].user.equals(req.user._id))
      {
        post.like[i].remove(function (err) {
          if(err){
            return handleError(res,err);
            c
          } 
        });
        break;
      }
    };
        
         
            post.save(function (err){
              if(err){ return handleError(res, err);}
              else 
              {
                console.log('error');
                return res.json({removed : true});
              }
            });
          
        
         
  });
};



function handleError(res, err) {
  return res.send(500, err);
}