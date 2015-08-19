'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');


// Get list of images
exports.index = function(req, res) {
  Image.find(function (err, images) {
    if(err) { return handleError(res, err); }
    return res.json(200, images);
  });
};

// Get a single image
exports.show = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    return res.json(image);
  });
};

// Creates a new image in the DB.
exports.create = function(req, res) {
  console.log(req.body.imgName);

  var newImage = new Image({
    imgName:req.body.imgName,
    picUrl:req.body.picUrl,
    description:req.body.description
  });

  
  newImage.save(function (err){
    if(err) return handleError(res, err);
    else {
          req.user.images.push({image:newImage,role:['actor']});
          req.user.save(function (error) {
            if(error) {
              return handleError(res, err);
            }
            else {
              console.log('user saved');
            }
          });
          var newPost = new Post({
            imageId: newImage._id,
            type:2,
            createdOn:Date.now(),
            uploader:req.user._id,
            view_count:0,
            tags:req.body.tags,
            like:[]
            
          });
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else {
              console.log('post created');
            }
          });

          
          return res.json(200,newImage);
        }
    
    });
};


// Updates an existing image in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Image.findById(req.params.id, function (err, image) {
    if (err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    var updated = _.merge(image, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, image);
    });
  });
};

// Deletes a image from the DB.
exports.destroy = function(req, res) {
  Image.findById(req.params.id, function (err, image) {
    if(err) { return handleError(res, err); }
    if(!image) { return res.send(404); }
    image.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}