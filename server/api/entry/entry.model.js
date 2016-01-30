'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
  rating:{type:Number,default:0},
  entry:String,
  name:String,
  description:String, 
  createdOn:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Entry', EntrySchema);
