'use strict';

var _ = require('lodash');
var Video = require('./video.model');
var User = require('../user/user.model');
var Post = require('../post/post.model');
var Like = require('../like/like.model');
var Club = require('../club/club.model');
var Credit = require('../credit/credit.model');

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
  Video.findOne({vidurl:req.params.vidCode})
  .populate('comments.comment')
  .exec(function (err, video){
    if(err) {
      return handleError(res, err);
    }
    else {
    return res.json(video);
  }
  });
};

// Creates a new video in the DB.

exports.create = function(req, res) {
  console.log(req.body.genres);
  console.log(req.body.creditType,req.body.creditUser);
  var vidUrl=req.body.vidurl;
  var a = vidUrl.split('watch?v=');
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  var type=13;
 

  var c=req.body.vedik;
  
  var b=[];
  for(var i=0;i<c.length;i++)
  {
    b[i]=c[i]._id;
  };
    console.log(b);
  var newVideo = new Video({
    vidname:req.body.vidname,
    vidurl:a[1],
    description:req.body.description,
    posterurl:req.body.posterurl
    
  });

  
console.log(newVideo);
  newVideo.save(function (err){
  
    if(err) { console.log('sd'); return handleError(res, err);}
    else {
        
          
          console.log('12');
          var newPost = new Post({
            videoId: newVideo._id,
            type:type,
            tags:req.body.genres,
            uploader:{user:req.user._id},   //club:req.params.id},
            ratings:[],
            rating:0,
            view_count:0,
            like:[],
            createdOn:Date.now()
          });
          
          for(var i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          console.log('1');
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else 
              {

                for(var i=0;i<req.body.creditType.length;i++)
                {
                  var users=req.body.creditUser[i];
                  console.log(users);
                  var newCredit =  new Credit({
                    postId:newPost._id,
                    credit:req.body.creditType[i]._id,
                    creditedUsers:[]
                  });

                  for(var j=0;j<req.body.creditUser[i].length;j++){
                    newCredit.creditedUsers.push({user:users[j]._id});
                  }
                  newCredit.save(function(err){
                  if(err) return handleError(res,err);
                  console.log('Credit added');
                })

                }


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

          
          return res.json(200,newVideo);
        }
    
    });
};

exports.clubPost = function(req, res) {
  console.log(req.params.id);
  console.log(req.body.creditType,req.body.creditUser);
  var vidUrl=req.body.vidurl;
  var vidCode = vidUrl.split('watch?v=');

 

  var c=req.body.vedik;
  
  var b=[];
  for(var i=0;i<c.length;i++)
  {
    b[i]=c[i]._id;
  };
  
  var newvideo = new Video({
    vidname:req.body.vidname,
    vidurl:vidCode[1],
    description:req.body.description,
    posterurl:req.body.posterurl,
    
  });

 
console.log(newvideo);
  newvideo.save(function (err){
    console.log('12');
    if(err) return handleError(res, err);
    else {
        
          console.log('12');
          var newPost = new Post({
            videoId: newvideo._id,
            type:23,
            tags:req.body.genres,
            uploader:{user:req.user._id}, //club:req.params.id},           
            ratings:[],
            rating:0,          
            like:[],
            createdOn:Date.now(),
            uploaderClub:req.params.id
          });
          
          

          for(var i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          console.log('1');
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else 
              {
                for(var i=0;i<req.body.creditType.length;i++)
                {
                  var users=req.body.creditUser[i];
                  console.log(users);
                  var newCredit =  new Credit({
                    postId:newPost._id,
                    credit:req.body.creditType[i]._id,
                    creditedUsers:[]
                  });

                  for(var j=0;j<req.body.creditUser[i].length;j++){
                    newCredit.creditedUsers.push({user:users[j]._id});
                  }
                  newCredit.save(function(err){
                  if(err) return handleError(res,err);
                  console.log('Credit added');
                })

                }

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

          
          return res.json(200,newvideo);
        }
    
    });
};


exports.eventPost = function(req, res) {
  console.log(req.params.id);

  var vidUrl=req.body.vidurl;
  var vidCode = vidUrl.split('watch?v=');
  
 
 

  
   
  var newvideo = new Video({
    vidname:req.body.vidname,
    vidurl:vidCode[1],
    description:req.body.description,
    posterurl:req.body.posterurl,
    
  });

 
console.log(newvideo);
  newvideo.save(function (err){
    console.log('123');
    if(err) return handleError(res, err);
    else {
        
          console.log('12');
          var newPost = new Post({
            videoId: newvideo._id,
            type:33,
            uploader:{user:req.user._id}, //club:req.params.id},
            
            like:[],
            createdOn:Date.now(),
            uploaderClub:req.params.id,
            eventId:req.body.eventId
          });
          
         
          console.log('1');
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

          
          return res.json(200,newvideo);
        }
    
    });
};

// Creates a new video of club in the DB.
exports.clubEventPost = function(req, res) {
  console.log(req.user._id);
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
      type=23; //2=club
      
  }
  
  var newvideo = new Video({
    vidname:req.body.vidname,
    vidurl:req.body.vidurl,
    description:req.body.description,
    posterurl:req.body.posterurl,
    
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
 
    if(err) {return handleError(res, err); }
    else {
  
          /*req.user.videos.push({video:newvideo,role:['actor']});
          req.user.save(function (error) {
            if(error) {
              return handleError(res, err);
            }
            else {
              console.log('user saved??');
            }
          });*/
         
          var newPost = new Post({
            videoId: newvideo._id,
            type:type, //clubVideo
            tags:req.body.genres,
            view_count:0,
            ratings:[],
            rating:0,
            like:[],
            createdOn:Date.now()
          });

           if(eventId)
              newPost.uploader.push({user:req.user._id},{club:req.params.id},{event:eventId});
          else
              newPost.uploader.push({user:req.user._id},{club:req.params.id});
            
          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }


          console.log('yo');
          newPost.save(function(err){
            if(err) {return handleError(res,err);console.log('post create2d');}

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

          
          return res.json(200,newvideo);
        }
    
    });
};


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
    if(docs.length>1){
      console.log('serious prob');
    }
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
          if(!user) {
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
              res.json({vidRating:docs.vidRating,votes:docs.votes}); //to update votes and vidRatings on putting rating
            }
          });
          user.save(function (err){
            if(err) {
              console.log(err);
            }
            else {

            }
          });
        }
      });
    }
  });
};
/*
exports.deleteComment = function (req,res) {
  var videoId = req.params.videoId;
  Video.findById(videoId,function (err,video){
    console.log(video.comments[0].comment);
    video.comments.pull({_id:req.params.commentId});
    video.save(function (err){
      if(err) {return handleError(res, err);}
      else {
        console.log(video.comments);
        return res.json(video);
      }
    })
  })
}
*/
function handleError(res, err) {
  return res.send(500, err);
}