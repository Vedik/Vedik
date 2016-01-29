'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');
var Credit = require('../credit/credit.model');
var ForNotif= require('../forNotif/forNotif.model');

// Get list of posts
exports.index = function(req, res) {
  console.log('err');
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .deepPopulate('articleId videoId imageId uploader.user uploaderClub eventId comments.comment eventId.winners.user')
  
  .exec(function (err, posts){
      if (err) return handleError(err);

      
      //console.log(posts);
      
      return res.json(posts);
  })
};

exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    console.log(post, 11111111111111111111111111111);
    if(!post) { return res.send(404); }
  })
  .deepPopulate('articleId videoId imageId uploader.user uploaderClub eventId comments.comment eventId.winners.user')
  
  .exec(function (err, post){
      if (err) return handleError(err);
      return res.json(post);
  })
};


exports.unseenNotifs = function(req, res) {
  console.log(req.user.unseenNotifs);

  Post.find({
                '_id': { $in: req.user.unseenNotifs}
                      },function (err, posts) {
              if(err) {console.log('dddddddd'); return handleError(res, err); }
              })
            .populate('articleId videoId imageId uploader.user uploaderClub eventId comments.comment')
            
            .exec(function (err, posts){
                if (err) return handleError(err);

                ForNotif.find({
                    '_id': { $in: req.user.otherUnseenNotifs}
                      },function (err, notifs) {
              if(err) {console.log('dddddddd'); return handleError(res, err); }
                })
                .deepPopulate('postId.articleId postId.videoId postId.imageId postId.uploader.user postId.uploaderClub')
                .exec(function (err, notifs){
                    if (err) return handleError(err);
                   
                    console.log('dddddddd');
                    var notifsAll = notifs.concat(posts);
                    return res.json(notifsAll);
                })

  });
};

exports.hof = function(req, res) {
  
  User.findById(req.params.id,function (err, user){
  Post.find({
                '_id': { $in: user.hof}
                      },function (err, posts) {
              if(err) {console.log('hof'); return handleError(res, err); }
              })
            .populate('articleId videoId imageId uploader.user uploaderClub eventId comments.comment')
            
            .exec(function (err, posts){
                if (err) return handleError(err);

                
               
                console.log('hof2')
                console.log(posts);
                return res.json(posts);
  });
  })
};


exports.likeInfo = function(req, res) {
  console.log('err456745665');
  Post.findById(req.params.postIdLike,function (err, post) {
    if(err) { return handleError(res, err); }
     var i=0,j=0;
      
      var liking=false;
      console.log(post.like.length);
        {
      
          for(j;j<post.like.length;j++)
          {
            
             if(post.like[j].user.equals(req.user._id))
             {
                
                liking = true;
                break;
             }
             

          } 
        }
        
           
     
      console.log(liking);
      
      return res.json(liking);
    })
  
};

exports.ratingInfo = function(req, res) {
  console.log('err4567');
  Post.findById(req.params.postIdRating,function (err, post) {
    if(err) { return handleError(res, err); }
  
   var i=0,j=0;
      
      var rating=false;
      var ratingValue;

        {
          for(j;j<post.ratings.length;j++)
          {
            
             if(post.ratings[j].user.equals(req.user._id))
             {
                
                rating = true;
                ratingValue=post.ratings[j].rating;
                break;
             }
             

          } 
        }
        
           
     
     
      
      return res.json({rating:rating,ratingValue:ratingValue,votes:post.ratings.length});
  })
};

// Get a single post
exports.showForUser = function(req, res) {
  console.log('23');
  console.log(req.params.id);
  if(1)
  {
  var user_id = req.params.id;
  var query = {};

  query['uploader.' + 'user'] = user_id;
  Credit.find( { creditedUsers: { $elemMatch: { user:user_id ,confirmed:true} } },function (err, credits) {
    if(err) { return handleError(res, err); }
        var postId=[];
          for(var i=0;i<credits.length;i++){
            postId[i]=credits[i].postId;
          }
            console.log(postId);
    
  Post.find({
                '_id': { $in: postId}
                      },function (err, posts) {
              if(err) {console.log('dddddddd'); return handleError(res, err); }
              })
      .populate('articleId videoId imageId like.user uploader.user vedik.vedik eventId comments.comment uploaderClub')
      
      .exec(function (err, posts){
          if (err) return handleError(err);
     
          console.log('er12');
          
          return res.json({posts:posts,credits:credits});
      })
    })
}
};

exports.showForClub = function(req, res) {
  console.log(req.params.id+'jbbhgf');
   var club_id = req.params.id;
  var query = {};
   query['uploaderClub'] = club_id;
  Credit.find( { creditedClubs: { $elemMatch: { club:club_id } } },function (err, credits) {
    if(err) { return handleError(res, err); }
        var postId=[];
          for(var i=0;i<credits.length;i++){
            postId[i]=credits[i].postId;
          }
            console.log(postId);
    
  Post.find({
                '_id': { $in: postId}
                      },function (err, posts) {
              if(err) {console.log('dddddddd'); return handleError(res, err); }
              })
      .populate('articleId videoId imageId like.user uploader.user vedik.vedik eventId comments.comment uploaderClub')
      
      .exec(function (err, posts){
          if (err) return handleError(err);
     
          console.log('er12');
          
          return res.json({posts:posts,credits:credits});
      })
    })
};

exports.showForEvent = function(req, res) {
  console.log(' req.params.id');
   var event_id = req.params.id;
  var query = {};
  query['eventId'] = event_id;
  Post.find({eventId:req.params.id},function (err, posts) {
    if(err) { return handleError(res, err); }
    })
  .deepPopulate('articleId videoId imageId like.user uploaderClub eventId.winners.user comments.comment uploader.user vedik.vedik')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er2');
      
      return res.json(posts);
  })
};
//).elemMatch("vedik",{"_id":stage_id}).exec(
exports.showForStage = function(req, res) {
  console.log(req.user._id);
   var stage_id = req.params.id;
    var x ='ObjectId("'+stage_id+'")';
    var y=req.user._id;
    console.log(x);
 
  Post.find({ vedik: { $elemMatch: {vedik:stage_id} } },function (err, posts) {
    console.log(posts);
    if(err) { console.log(posts+"dfggf"); return handleError(res, err);
     }
     console.log(posts+"dfggf")
    })
  .populate('articleId videoId imageId like.user uploaderClub eventId comments.comment uploader.user vedik.vedik')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er2');
      
      return res.json(posts);
  })
};

exports.showStageForUser = function(req, res) {
  console.log(req.user._id);
   var stage_id = req.params.id;
    var x ='ObjectId("'+stage_id+'")';
    var y=req.user._id;
    console.log(x);
     var query = {};
  query['uploader.' + 'user'] = y;
  Credit.find( { creditedUsers: { $elemMatch: { user:user_id } } },function (err, credits) {
    if(err) { return handleError(res, err); }
        var postId=[];
          for(var i=0;i<credits.length;i++){
            postId[i]=credits[i].postId;
          }
            console.log(postId);
  Post.find( { $and: [ query, {vedik: { $elemMatch: {vedik:stage_id} } }  ] },function (err, posts) {
    console.log(posts);
    if(err) { console.log(posts+"dfggf"); return handleError(res, err);
     }
     console.log(posts+"dfggf");
    })
  .populate('articleId videoId imageId like.user uploaderClub eventId comments.comment uploader.user vedik.vedik')
  
  .exec(function (err, posts){
      if (err) return handleError(err);
     
      console.log('er2');
      
      return res.json(posts);
  })
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
  console.log(req.params.postId);
  Post.findById(req.params.postId, function (err, post) {
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

 /* var date = new Date(Date.now());  // dateStr you get from mongodb

var d = date.getFullYear();
  console.log(d+'d');*/

  console.log('dfsdfbv');
  Post.findById(req.params.postId,function (err,post){
    if(err){
      return handleError(res,err);
    }
    
    post.like.push({user:req.user._id});
    post.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
      
        return res.json(post.like.length);
      }
    });  
  });
};
exports.unlike = function (req,res){
  Post.findById(req.params.postId,function (err,post){
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
                
                return res.json(post.like.length);
              }
            });
          
        
         
  });
};

exports.rate = function(req, res, next) {
  var id = req.user._id;
  var postId = req.params.postId;
  console.log(req.body.rating);

  Post.findById(postId, function (err, doc){
    if(doc.length>1){
      console.log('serious prob');
    }
    if(err) {
      console.log(err+'is the error');
    }
    else {

            var rated=false;
            var currentRating=0;
            var votes=doc.ratings.length;
            var votesNew=votes;
            for(var i=0;i<doc.ratings.length;i++)
            {
              if(doc.ratings[i].user.equals(id))
              {
                currentRating=doc.ratings[i].rating;
                doc.ratings[i].rating=req.body.rating;
                rated=true;

                console.log('changed rating');
                break;
              }
            }
            if(!rated)
            {
              doc.ratings.push({user:id,rating:req.body.rating});
              console.log('addnew rating');
              votesNew= votes+1;
            }
       
          
            doc.rating = (doc.rating*(votes)+req.body.rating-currentRating)/(votesNew);

          
          doc.save(function (err){
            if(err) {
              console.log(err);
            }
            else {
              res.json({rating:doc.rating,votes:votesNew}); //to update votes and vidRatings on putting rating
            }
          });
        }
          
        });
      };




function handleError(res, err) {
  return res.send(500, err);
}