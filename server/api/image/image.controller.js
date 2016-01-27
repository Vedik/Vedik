'use strict';

var _ = require('lodash');
var Image = require('./image.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');
var Club = require('../club/club.model');
var Credit = require('../credit/credit.model');
var Event= require('../event/event.model');
var ForNotif= require('../forNotif/forNotif.model');

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
  var a=req.body.vedik;
  console.log(a[1]);
  var b=[];
  for(var i=0;i<a.length;i++)
  {
    b[i]=a[i]._id;
  }
  console.log(b);
  var newImage = new Image({
    imgName:req.body.imgName,
    picUrl:req.body.picUrl,
    description:req.body.description
  });


  newImage.save(function (err){
    if(err) return handleError(res, err);
    else {
       /*   req.user.images.push({image:newImage,role:['actor']});
          req.user.save(function (error) {
            if(error) {
              return handleError(res, err);
            }
            else {
              console.log('user saved');
            }
          });*/
          var newPost = new Post({
            imageId: newImage._id,
            tags:req.body.tags,
            uploader:{user:req.user._id},   //club:req.params.id},
            ratings:[],
            rating:0,
            view_count:0,
            like:[],
            createdOn:Date.now()
          });
          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }
          if(req.body.creditsRadio=='me' && !req.body.club){
            newPost.type=121;
          }
          else if(req.body.creditsRadio=='me' && req.body.club){
            newPost.type=122;
            newPost.uploaderClub=req.body.team._id;
          }
          else if(req.body.creditsRadio=='team'){
            newPost.type=123;
            newPost.team=req.body.team;
          }
          newPost.save(function(err){
            if(err) return handleError(res,err);
            else 
              {

                if(req.body.creditsRadio=='me' && !req.body.club)
                {
                  for(var i=0;i<req.body.credits.length;i++)
                  {
                    var newCredit =  new Credit({
                      postId:newPost._id,
                      credit:req.body.credits[i]._id,
                      creditedUsers:[]
                    });

                    
                      newCredit.creditedUsers.push({user:req.body.team,confirmed:true});
                    
                    newCredit.save(function(err){
                    if(err) return handleError(res,err);
                    console.log(newCredit);
                  })

                  }
                }
                else if(req.body.creditsRadio=='me' && req.body.club)
                {
                  for(var i=0;i<req.body.credits.length;i++)
                  {
                    var newCredit =  new Credit({
                      postId:newPost._id,
                      credit:req.body.credits[i]._id,
                      creditedClubs:[]
                    });

                    
                      newCredit.creditedClubs.push({club:req.body.team._id,confirmed:true});
                    
                    newCredit.save(function(err){
                    if(err) return handleError(res,err);
                    console.log(newCredit);
                  })

                  }
                }
                else if(req.body.creditsRadio=='team')
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
                        if(users[j]._id==req.user._id){
                          newCredit.creditedUsers.push({user:users[j]._id,confirmed:true});
                        }
                        else{
                          newCredit.creditedUsers.push({user:users[j]._id,confirmed:false})
                        }
                        
                      }
                      newCredit.save(function(err){
                      if(err) return handleError(res,err);
                      console.log('Credit added');
                    })

                    }
                }
                console.log(newPost);
             

                
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
              };
          });
        
          console.log(newImage);
          return res.json(200,newPost._id);
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
  
 
 
  var newImage = new Image({
    imgName:req.body.imgName,
    picUrl:req.body.picUrl,
    description:req.body.description
  });
 

  newImage.save(function (err){
 
    if(err) {return handleError(res, err); }
    else {
  
          
         
          var newPost = new Post({
            imageId: newImage._id,
            type:22,
            createdOn:Date.now(),
            uploader:{user:req.user._id},
            view_count:0,
            ratings:[],
            rating:0,
            tags:req.body.tags,
            like:[]
            
          });

              newPost.uploaderClub=req.params.id;
            
          for(i=0;i<b.length;i++)
          {
            newPost.vedik.push({vedik:b[i]});
          }

         
            
          
          newPost.save(function(err){
            if(err) {return handleError(res,err);}

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

          
          return res.json(200,newImage);
        }
    
    });
};

exports.eventPost = function(req, res) {
  console.log(req.body.eventId);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  
  

 
  var newImage = new Image({
    imgName:req.body.imgName,
    picUrl:req.body.picUrl,
    description:req.body.description
  });
 
  newImage.save(function (err){
 
    if(err) {return handleError(res, err); }
    else 
    {  
         
      var newPost = new Post({
        imageId: newImage._id,
        createdOn:Date.now(),
        uploader:{user:req.user._id},
        ratings:[],
        like:[],
        uploaderClub:req.params.id,
      });
      if(!req.body.club){
        newPost.eventId=req.body.eventId;
        newPost.type=32;
      }
      else if(req.body.club){
        newPost.type=22;
      }
       
     console.log(newPost);     
      newPost.save(function (err)
      {
        if(err) {console.log(req.params.id); return handleError(res, err);}

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
      } );

          
          return res.json(200,newImage);
        }
    
    });
};

exports.BeventPost = function(req, res) {
  console.log(req.params.id);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  
  
Event.findById(req.body.eventId,function (err,event){


 
  var newImage = new Image({
    imgName:req.body.imgName,
    picUrl:req.body.picUrl,
    description:req.body.description
  });
 
  newImage.save(function (err){
 
    if(err) {return handleError(res, err); }
    else 
    {  
         
      var newPost = new Post({
        imageId: newImage._id,
        type:42,
        createdOn:Date.now(),
        uploader:{user:req.user._id},
        ratings:[],
        like:[],
        uploaderClub:req.params.id,
        eventId:req.body.eventId
      });

        newPost.vedik=event.vedik;
      
         

         
            
     console.log(newPost);     
      newPost.save(function (err)
      {
        if(err) {console.log(req.params.id); return handleError(res, err);}

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
      } );

          
          return res.json(200,newImage);
        }
    
    });
  })
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