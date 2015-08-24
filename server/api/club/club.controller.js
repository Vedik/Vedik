'use strict';

var _ = require('lodash');
var Club = require('./club.model');

// Get list of clubs
exports.index = function(req, res) {
  Club.find(function (err, clubs) {
    if(err) { return handleError(res, err); }
    return res.json(200, clubs);
  });
};

// Get a single club
exports.show = function(req, res) {
  console.log('sdf');
  Club.findById(req.params.id, function (err, club) {
    if(err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    console.log(club);
    return res.json(club);
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
    admin:req.user._id,
    subscribed_users:[],
    stage_for:[],
    events:[]
  })
  newClub.save(function (err){
    if(err){
      return handleError(res,err);
    }
    else {
      console.log('The club is saved as \n'+newClub);
      res.json(newClub);
    }
  });
};

exports.editProfile = function (req, res) {
  var userId = req.user._id;
  var type=req.params.type;
  
  console.log(req.body.editProfile);
  console.log(req.params.type);

  Club.findById(userId, function (err,club){

    if(type==1)
    {
     club.name=req.body.editProfile; 
    }
    else if (type==2)
    {
      club.about=req.body.editProfile;
    }
    else if (type==3)
    {
      club.galleryPic=req.body.editProfile;
    }
    
    club.save(function (err) {
      if (err) { return handleError(res, err); }
      
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

function handleError(res, err) {
  return res.send(500, err);
}