'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');
var Like = require('../like/like.model');

// Get list of articles
exports.index = function(req, res) {
  Article.find(function (err, articles) {
    if(err) { return handleError(res, err); }
    return res.json(200, articles);
  });
};

// Get a single article
exports.show = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    return res.json(article);
  });
};

// Creates a new article in the DB.
exports.create = function(req, res) {
  

  var newArticle = new Article({
    articleName:req.body.articleName,
    content:req.body.content,
    description:req.body.description,
    
  });

  
  newArticle.save(function (err){
    if(err) return handleError(res, err);
    else {
         /* req.user.articles.push({article:newArticle,role:['actor']});
          req.user.save(function (error) {
            if(error) {
              return handleError(res, err);
            }
            else {
              console.log('user saved');
            }
          });*/
          var newPost = new Post({
            articleId: newArticle._id,
            tags:req.body.tags,
            type:1,
            uploader:{user:req.user._id},
            view_count:0,
            like:[],
            createdOn:Date.now()
          });
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else {
              console.log('post created');
            }
          });

          
          return res.json(200,newArticle);
        }
    
    });
};


exports.clubPost = function(req, res) {
  console.log(req.params.id);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  var newArticle = new Article({
    articleName:req.body.articleName,
    content:req.body.content,
    description:req.body.description,
    
  });
 

  newArticle.save(function (err){
 
    if(err) {return handleError(res, err); }
    else {
  
          
         
          var newPost = new Post({
            articleId: newArticle._id,
            tags:req.body.tags,
            type:4,
            uploader:({user:req.user._id},{club:req.params.id}),
            view_count:0,
            like:[],
            createdOn:Date.now()
          });
          
          newPost.save(function(err){
            if(err) {return handleError(res,err);}

            else {
              console.log('post created');
            }
          });

          
          return res.json(200,newArticle);
        }
    
    });
};




// Updates an existing article in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Article.findById(req.params.id, function (err, article) {
    if (err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    var updated = _.merge(article, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, article);
    });
  });
};

// Deletes a article from the DB.
exports.destroy = function(req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) { return handleError(res, err); }
    if(!article) { return res.send(404); }
    article.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}