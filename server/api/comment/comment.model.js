'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commentPutter:{type:String,required:true},
  commentData:{type:String,required:true},
  datePosted:{type:Date,default:Date.now()},
  dateEdited:{type:Date,default:Date.now()},
});

module.exports = mongoose.model('Comment', CommentSchema);