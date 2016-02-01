'use strict';

var _ = require('lodash');
var ForNotif = require('./forNotif.model');

// Get list of forNotifs
exports.index = function(req, res) {
  ForNotif.find(function (err, forNotifs) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(forNotifs);
  });
};

// Get a single forNotif
exports.show = function(req, res) {
  ForNotif.findById(req.params.id, function (err, forNotif) {
    if(err) { return handleError(res, err); }
    if(!forNotif) { return res.status(404).send('Not Found'); }
    return res.json(forNotif);
  });
};

// Creates a new forNotif in the DB.
exports.create = function(req, res) {
  ForNotif.create(req.body, function(err, forNotif) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(forNotif);
  });
};

// Updates an existing forNotif in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  ForNotif.findById(req.params.id, function (err, forNotif) {
    if (err) { return handleError(res, err); }
    if(!forNotif) { return res.status(404).send('Not Found'); }
    var updated = _.merge(forNotif, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(forNotif);
    });
  });
};

// Deletes a forNotif from the DB.
exports.destroy = function(req, res) {
  ForNotif.findById(req.params.id, function (err, forNotif) {
    if(err) { return handleError(res, err); }
    if(!forNotif) { return res.status(404).send('Not Found'); }
    forNotif.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}