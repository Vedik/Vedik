'use strict';

var _ = require('lodash');
var Article = require('./article.model');
var Post = require('../post/post.model');
var User = require('../user/user.model');
var Like = require('../like/like.model');
var Club = require('../club/club.model');
var Event = require('../event/event.model');
var Credit = require('../credit/credit.model');
var ForNotif= require('../forNotif/forNotif.model');

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
          if(req.body.creditsRadio=='me' && !req.body.club){
            newPost.type=111;
          }
          else if(req.body.creditsRadio=='me' && req.body.club){
            newPost.type=112;
            newPost.uploaderClub=req.body.team._id;
          }
          else if(req.body.creditsRadio=='team'){
            newPost.type=113;
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
                if(req.body.creditsRadio=='me' && req.body.club)
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

                      for(var j=0;j<req.body.creditUser[i].length;j++)
                      {console.log(users[j]._id,req.user._id)
                        if(users[j]._id==req.user._id){
                          newCredit.creditedUsers.push({user:users[j]._id,confirmed:true});
                        }
                        else{
                          newCredit.creditedUsers.push({user:users[j]._id,confirmed:false});
                          /* adding confirmation notif*/
                          var newForNotif= new ForNotif({
                            postId:newPost._id,
                            type:91,
                            createdOn:Date.now()
                          })
                          newForNotif.save( function (err){
                            if(err) return handleError(res,err);
                            console.log('added confirmation notif to user',j);
                          })
                          User.findById(users[j]._id,function (err, user){
                            if(err) return handleError(res,err);
                            user.otherUnseenNotifs.push(newForNotif._id);
                            user.save(function (err){
                              if(err) return handleError(res,err);
                              console.log(j);
                            })
                          })
                        }
                      }
                      newCredit.save(function(err){
                      if(err) return handleError(res,err);
                      console.log('Credit added');
                    })

                    }
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
                        user.subscribed_users[i].user.save(function (err){
                          if(err)
                            return handleError(res,err);
                           console.log('add unseen notif to',i);
                          
                       
                        });
                      }
                  }
                 
                  
                });

            }
          });
          
          
          // console.log(post);
         
              return res.json(newPost._id)    ;
          
          
          
        }
    
    });
};



// exports.clubPost = function(req, res) {
//   console.log(req.params.id);
//   /*Video.create(req.body, function(err, video) {
//     if(err) { return handleError(res, err); }
//     return res.json(201, video);
//   });*/
//   var a=req.body.vedik;
  
//   var b=[];
//   for(var i=0;i<a.length;i++)
//   {
//     b[i]=a[i]._id;
//   };
  
  

//   var newArticle = new Article({
//     articleName:req.body.articleName,
//     content:req.body.content,
//     description:req.body.description,
    
//   });
 

//   newArticle.save(function (err){
 
//     if(err) {return handleError(res, err); }
//     else {
  
          
         
//           var newPost = new Post({
//             articleId: newArticle._id,
//             tags:req.body.tags,
//             type:21,
//             view_count:0,
//             uploader:{user:req.user._id},
//             ratings:[],
//             rating:0,
//             like:[],
//             createdOn:Date.now(),
//             uploaderClub:req.params.id
//           });
         
//           for(i=0;i<b.length;i++)
//           {
//             newPost.vedik.push({vedik:b[i]});
//           }
//           newPost.save(function(err){
//             if(err) return handleError(res,err);
//             else 
//               {
                

//                 for(var i=0;i<req.body.creditType.length;i++)
//                 {
//                   var users=req.body.creditUser[i];
//                   console.log(users);
//                   var newCredit =  new Credit({
//                     postId:newPost._id,
//                     credit:req.body.creditType[i]._id,
//                     creditedUsers:[]
//                   });

//                   for(var j=0;j<req.body.creditUser[i].length;j++){
//                     newCredit.creditedUsers.push({user:users[j]._id});
//                   }
//                   newCredit.save(function(err){
//                   if(err) return handleError(res,err);
//                   console.log('Credit added');
//                 })

//                 }


//                 console.log('post created');
             
                
//                Club.findById(req.params.id,function (err,club){
//                     if(err) { return handleError(res, err); }
//                 })
//                 .populate('subscribed_users.user')
//                 .exec(function(err,club){
//                     if (err) return handleError(err);
//                   for(var i=0;i<club.subscribed_users.length;i++)
//                   {
//                       console.log(club.subscribed_users[i].user._id);
//                       if(club.subscribed_users[i].user._id.equals(req.user._id))
//                       {
//                         console.log('user');
//                       }
//                       else
//                       {
//                         club.subscribed_users[i].user.unseenNotifs.push(newPost._id);
//                         club.subscribed_users[i].user.save(function (error){
//                           if(error){
//                             return handleError(res,err);
//                           }
//                           else
//                           {
//                              console.log('add unseen notif to');
//                           }
                       
//                         });
//                       }
//                   }
                 
                  
//                 });

//             }
//           });

          
//           return res.json(200,newArticle);
//         }
    
//     });
// };

exports.eventPost = function(req, res) {
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
            
            view_count:0,
            uploader:{user:req.user._id},
            ratings:[],
            like:[],
            createdOn:Date.now(),
            uploaderClub:req.params.id,
            
          });
          if(!req.body.club){
            newPost.eventId=req.body.eventId;
            newPost.type=31;
          }
          else if(req.body.club){
            newPost.type=21;
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
           //  console.log(newArticle._id,"ss");
           // Post
           //  .findOne({articleId:newArticle._id})
           //  .populate('articleId videoId imageId like.user uploaderClub eventId comments.comment uploader.user vedik.vedik')
  
           //  .exec(function (err, post){
           //      if (err) return handleError(err);
               
           //      console.log(post);
                
           //      return res.json(post);
           //  })
            console.log(newPost);
           return res.json(200,newPost);
        }
    
    });
};

exports.eventResults = function(req, res) {
  console.log(req.params.id);
  /*Video.create(req.body, function(err, video) {
    if(err) { return handleError(res, err); }
    return res.json(201, video);
  });*/
  

  var newArticle = new Article({
    description:req.body.description,
    
  });
 

  newArticle.save(function (err){
 
    if(err) {return handleError(res, err); }
    else {
  
          
         
          var newPost = new Post({
            articleId: newArticle._id,            
            
            view_count:0,
            uploader:{user:req.user._id},
            like:[],
            createdOn:Date.now(),
            uploaderClub:req.params.id,
            
          });
          
            newPost.eventId=req.body.eventId;
            newPost.type=34;
          
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
          var eventDetails;
          console.log('aaaaaaaaa',newPost.eventId);
          Event.findById(newPost.eventId,'winners',function (err,eventDetails){
            if (err) {return handleError(err);}
          })
          .populate('winners.user')
          .exec(function(err,user){
            eventDetails=eventDetails; 
          });
          console.log(eventDetails);
          var post=[{
              _id:newPost._id,
              articleId:newArticle,
              eventId:eventDetails,
              type:newPost.type,
              uploader:{user:req.user},
              ratings:[{user:"",rating:{type:Number,default:0}}],
              like:[],
              createdOn:newPost.createdOn
          }];
            
            console.log(post);
           return res.json(200,post);
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