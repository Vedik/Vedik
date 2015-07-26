'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CreditDetSchema = new Schema({
  CreditDetail:String
});

module.exports = mongoose.model('CreditDet', CreditDetSchema);