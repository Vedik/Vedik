'use strict';

var _ = require('lodash');
var Club = require('./club.model');
var Stage = require('../stage/stage.model');
var User = require('../user/user.model');


// Get list of clubs
exports.index = function(req, res) {
  Club.find(function (err, clubs) {
    if(err) { return handleError(res, err); }
    return res.json(200, clubs);
  });
};
exports.tagingClub = function(req, res) {
  var query = req.params.query;
  Club.find({ "name": { "$regex": query, "$options": "i" } },'name',function (err, clubs) {
    if(err) { return handleError(res, err); }
    console.log(clubs);
    return res.json(200, clubs);
  });
};

// Get a single club
exports.show = function(req, res) {
  console.log('sdf');
  Club.findById(req.params.id, function (err, club) {
    if(err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    
    
  })
  .populate('admin')
  .exec(function (err , club){
    if(err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    
     var isFollowing;
    for(var i=0;i<club.subscribed_users.length;i++){
      if(club.subscribed_users[i].user.equals(req.user._id)){
        isFollowing = true;
        break;
      }
    }
    if(isFollowing!=true){
      isFollowing=false;
    }
    var isAdmin=false;
    for(var i=0;i<club.admin.length;i++){
      if(club.admin[i]._id.equals(req.user._id)){
        isAdmin = true;
        break;
      }
    }
    console.log({club:club,isFollowing:isFollowing,isAdmin:isAdmin});
   
    return res.json({club:club,isFollowing:isFollowing,isAdmin:isAdmin});
  });
  
 // var clubId = req.params.id;
  /*User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    res.json(user);
  });*/
 /* User.findById(clubId)
  .populate('videos.video')
  .exec(function (err, user){
    if(err) {
      console.log(err);
      next(err);
    }
    else {
    res.json(user);

  }
  });*/
};

// Creates a new club in the DB.
exports.create = function(req, res) {
 /* Club.create(req.body, function(err, club) {
    if(err) { return handleError(res, err); }
    return res.json(201, club);
  });*/

  var newClub = new Club({
    name: req.body.name,
    galleryPic:req.body.posterUrl,
    about:req.body.description,
    createdOn:Date.now(),
    posts:[],
    
    subscribed_users:[],
    vedik:[],
    events:[]
  })

  newClub.admin.push(req.user._id);

  newClub.save(function (err){
    if(err){
      return handleError(res,err);
    }
    else {

      req.user.asAdmin.push({user:newClub._id});
      req.user.save(function (err){
        if(err){
          return handleError(res,err);
        }
        console.log('added to user');
      });
      console.log('The club is saved as \n'+newClub);
      res.json(newClub);
    }
  });
};

exports.editProfile = function (req, res) {
  var clubId = req.params.id;
  
  console.log('editProfile');

  Club.findById(clubId, function (err,club){

    club.name= req.body.name;
    club.galleryPic=req.body.galleryPic;
    club.about=req.body.about;
    club.proPic=req.body.proPic;
    
    
    club.save(function (err) {
      if (err) { return handleError(res, err); }
        console.log(club);
       res.json(200, club);

    });
  });
};

// Updates an existing club in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Club.findById(req.params.id, function (err, club) {
    if (err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    var updated = _.merge(club, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, club);
    });
  });
};

// Deletes a club from the DB.
exports.destroy = function(req, res) {
  Club.findById(req.params.id, function (err, club) {
    if(err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    club.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

exports.search = function (req, res, next) {
  var query = req.params.searchQuery;
  Club.find(
    { "name": { "$regex": query, "$options": "i" } },'name',
    function(err,docs) {
      if(!err) {
        res.json(docs);
      }
      else {
        console.log(err);
        res.json([{name:'Error',href:"#"}]);
      } 
    } 
  );
};

exports.addAdmin = function (req,res){
  Club.findById(req.params.id,function (err,club){
    if(err){
      return handleError(res,err);
    }
    if(!club) { return res.send(404); }
    for(var i=0;i<req.body.newAdmins.length;i++)
    {
        club.admin.push(req.body.newAdmins[i]._id);
        User.findById(req.body.newAdmins[i]._id,function (err,user){
          user.asAdmin.push(req.params.id);
          user.save(function (err){
            if(err) return handleError(res,err);
            console.log('added to user'+i);
          })
        })
    }
    
    club.save(function (err){
      if(err){
        return handleError(res,err);
      }

      else{
        console.log(club);
        return res.json(club.admin);
      }
    });  
  });
  
};

exports.deleteAdmin = function (req,res){
  console.log(req.body.userId);
  Club.findById(req.params.id,function (err,club){
    if(err){  console.log('safage');
      return handleError(res,err);}
      console.log('sfasv');
   for(var i=0;i<club.admin.length;i++){
    console.log('sfasv',i);
      if(club.admin[i].equals(req.body.userId)){
        console.log('sfasv',i);
        club.admin.splice(i,1);
         
            club.save(function (err){
              if(err){console.log('safssage'); return handleError(res, err);}
              else {
                console.log('sfasv',i);
                return res.json(club.admin);
           
          }
        })
      }
    } 
  });
};

exports.addSubscriber = function (req,res){
  Club.findById(req.params.id,function (err,club){
    if(err){
      return handleError(res,err);
    }
    if(!club) { return res.send(404); }
    club.subscribed_users.push({user:req.user._id});
    club.save(function (err){
      if(err){
        return handleError(res,err);
      }
      else{
        console.log(club);
        return res.json({added:true});
      }
    });  
  });
  
};

exports.deleteSubscriber = function (req,res){
  Club.findById(req.params.id,function (err,club){
    if(err){
      return handleError(res,err);
    }
    if(!club) { return res.send(404); }
    var i =0;
    for(;i<club.subscribed_users.length;i++){
      if(club.subscribed_users[i].user.equals(req.user._id)){
        club.subscribed_users[i].remove(function (err){
          if(err){ return handleError(res,err);}
          else{
            club.save(function (err){
              if(err){ return handleError(res, err);}
              else {
                return res.json({removed : true});
              }
            });
          }
        })
      }
    } 
  });
};

function handleError(res, err) {
  return res.send(500, err);
}