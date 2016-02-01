'use strict';

var _ = require('lodash');
var Fest = require('./fest.model');

// Get list of fests
exports.index = function(req, res) {
  Fest.find(function (err, fests) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(fests);
  });
};

// Get a single fest
exports.show = function(req, res) {
  Fest.findById(req.params.id, function (err, fest) {
    if(err) { return handleError(res, err); }
    if(!fest) { return res.status(404).send('Not Found'); }
    return res.json(fest);
  });
};

// Creates a new fest in the DB.
exports.create = function(req, res) {
  var newFest = new FEST({
    name:req.body.name,
    start_time:req.body.start_time,
    end_time:req.body.end_time,
    fbPageUrl:req.body.fbPageUrl,
    picUrl:req.body.picUrl,
    venue:String,
    attending_users:[],
    reviews:[],
    aboutUs:req.body.aboutUs,
    team:[],
    sponsers:[]
  })
};

// Updates an existing fest in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Fest.findById(req.params.id, function (err, fest) {
    if (err) { return handleError(res, err); }
    if(!fest) { return res.status(404).send('Not Found'); }
    var updated = _.merge(fest, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(fest);
    });
  });
};

// Deletes a fest from the DB.
exports.destroy = function(req, res) {
  Fest.findById(req.params.id, function (err, fest) {
    if(err) { return handleError(res, err); }
    if(!fest) { return res.status(404).send('Not Found'); }
    fest.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}