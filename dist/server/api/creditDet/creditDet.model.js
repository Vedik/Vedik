'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CreditDetSchema = new Schema({
  creditDetail:String
});

module.exports = mongoose.model('CreditDet', CreditDetSchema);