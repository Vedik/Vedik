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
  var creditDet = new CreditDet({creditDetail:req.body.creditDetail});
  creditDet.save(function (err){
    if(err) { return handleError(res, err);}
    else {
      return res.json(200,creditDet);
    }
  })
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

exports.searchCredit = function(req, res){
  var name = req.params.name;
  console.log(name);
  CreditDet.find(
    { "creditDetail": { "$regex": name, "$options": "i" } },'creditDetail',
    function(err,docs) {
      if(!err) {
        res.json(docs);
      }
      else {
        console.log(err);
        res.json([{creditDetail:'Error',href:"#"}]);
      } 
    } 
  );
}

function handleError(res, err) {
  return res.send(500, err);
}