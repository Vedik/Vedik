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
  Club.findById(req.params.id, function (err, club) {
    if(err) { return handleError(res, err); }
    if(!club) { return res.send(404); }
    return res.json(club);
  });
};

// Creates a new club in the DB.
exports.create = function(req, res) {
 /* Club.create(req.body, function(err, club) {
    if(err) { return handleError(res, err); }
    return res.json(201, club);
  });*/

  var newClub = new Club({
    name: req.body.name,
    picUrl:req.body.posterUrl,
    description:req.body.description,
    createdOn:Date.now(),
    posts:[],
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