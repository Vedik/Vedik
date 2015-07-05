'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  commentPutter:String,
  commentData:{type:String,required:true},
  datePosted:{type:Date},
  dateEdited:{type:Date},
  videoId:{type:Schema.Types.ObjectId, ref:"Video"}
});

module.exports = mongoose.model('Comment', CommentSchema);