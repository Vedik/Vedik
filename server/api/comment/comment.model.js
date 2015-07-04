'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commentPutter:{type:Schema.Types.ObjectId, ref:"User"},
  commentData:{type:String,required:true},
  datePosted:{type:Date,default:Date.now()},
  dateEdited:{type:Date,default:Date.now()},
  videoId:{type:Schema.Types.ObjectId, ref:"Video"}
});

module.exports = mongoose.model('Comment', CommentSchema);