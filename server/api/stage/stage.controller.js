'use strict';

var _ = require('lodash');
var Stage = require('./stage.model');

// Get list of stages
exports.index = function(req, res) {
  Stage.find(function (err, stages) {
    if(err) { return handleError(res, err); }
    return res.json(200, stages);
  });
};

// Get a single stage
exports.show = function(req, res) {
  Stage.findById(req.params.id, function (err, stage) {
    if(err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    return res.json(stage);
  });
};

// Creates a new stage in the DB.
exports.create = function(req, res) {
  Stage.create(req.body, function(err, stage) {
    if(err) { return handleError(res, err); }
    return res.json(201, stage);
  });
};

// Updates an existing stage in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Stage.findById(req.params.id, function (err, stage) {
    if (err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    var updated = _.merge(stage, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, stage);
    });
  });
};

// Deletes a stage from the DB.
exports.destroy = function(req, res) {
  Stage.findById(req.params.id, function (err, stage) {
    if(err) { return handleError(res, err); }
    if(!stage) { return res.send(404); }
    stage.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}