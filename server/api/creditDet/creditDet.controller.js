'use strict';

var _ = require('lodash');
var CreditDet = require('./creditDet.model');

// Get list of creditDets
exports.index = function(req, res) {
  CreditDet.find(function (err, creditDets) {
    if(err) { return handleError(res, err); }
    return res.json(200, creditDets);
  });
};

// Get a single creditDet
exports.show = function(req, res) {
  CreditDet.findById(req.params.id, function (err, creditDet) {
    if(err) { return handleError(res, err); }
    if(!creditDet) { return res.send(404); }
    return res.json(creditDet);
  });
};

// Creates a new creditDet in the DB.
exports.create = function(req, res) {
  CreditDet.create({creditDetail:req.body.creditDetail}, function(err, creditDet) {
    if(err) { return handleError(res, err); }
    return res.json(201, creditDet);
  });
};

// Updates an existing creditDet in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  CreditDet.findById(req.params.id, function (err, creditDet) {
    if (err) { return handleError(res, err); }
    if(!creditDet) { return res.send(404); }
    var updated = _.merge(creditDet, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, creditDet);
    });
  });
};

// Deletes a creditDet from the DB.
exports.destroy = function(req, res) {
  CreditDet.findById(req.params.id, function (err, creditDet) {
    if(err) { return handleError(res, err); }
    if(!creditDet) { return res.send(404); }
    creditDet.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}