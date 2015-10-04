'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');
var Like = require('../like/like.model');
var Club = require('../club/club.model');

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
  
  var a=req.body.vedik;
  console.log(a[1]);
  var b=[];
  for(var i=0;i<a.length;i++)
  {
    b[i]=a[i]._id;
  };
  

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
            type:11,
            uploader:{user:req.user._id},
            view_count:0,
            ratings:[],
            rating:0,
            like:[],
            createdOn:Date.now()
          });
          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else 
              {

                console.log('post created');
             

                
                User.findById(req.user._id,function (err,user){
                    if(err) { return handleError(res, err); }
                })
                .populate('subscribed_users.user')
                .exec(function(err,user){
                    if (err) return handleError(err);
                  for(var i=0;i<user.subscribed_users.length;i++)
                  {
                      console.log(user.subscribed_users[i].user._id);
                      if(user.subscribed_users[i].user._id.equals(req.user._id))
                      {
                        console.log('user');
                      }
                      else
                      {
                        user.subscribed_users[i].user.unseenNotifs.push(newPost._id);
                        user.subscribed_users[i].user.save(function (error){
                          if(error){
                            return handleError(res,err);
                          }
                          else
                          {
                             console.log('add unseen notif to');
                          }
                       
                        });
                      }
                  }
                 
                  
                });

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
  var a=req.body.vedik;
  
  var b=[];
  for(var i=0;i<a.length;i++)
  {
    b[i]=a[i]._id;
  };
  
  var type;
  var eventId;
  if(req.body.type)
  {
      type=req.body.type;
      eventId=req.body.eventId;
  }
  else
  {
      type=21;
      
  }

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
            type:type,
            view_count:0,
            uploader:{user:req.user._id},
            ratings:[],
            rating:0,
            like:[],
            createdOn:Date.now()
          });
          if(eventId)
          {
              newPost.uploaderClub=req.params.id;
              newPost.eventId=eventId;
          }
          else
              newPost.uploaderClub=req.params.id;

          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else 
              {

                console.log('post created');
             
                
               Club.findById(req.params.id,function (err,club){
                    if(err) { return handleError(res, err); }
                })
                .populate('subscribed_users.user')
                .exec(function(err,club){
                    if (err) return handleError(err);
                  for(var i=0;i<club.subscribed_users.length;i++)
                  {
                      console.log(club.subscribed_users[i].user._id);
                      if(club.subscribed_users[i].user._id.equals(req.user._id))
                      {
                        console.log('user');
                      }
                      else
                      {
                        club.subscribed_users[i].user.unseenNotifs.push(newPost._id);
                        club.subscribed_users[i].user.save(function (error){
                          if(error){
                            return handleError(res,err);
                          }
                          else
                          {
                             console.log('add unseen notif to');
                          }
                       
                        });
                      }
                  }
                 
                  
                });

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