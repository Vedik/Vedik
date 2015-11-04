'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClubSchema = new Schema({
  name: String,
  posts:[{post:{type:Schema.Types.ObjectId, ref:"Post"}}],
  galleryPic:String,
  about:String,
  createdOn:{type:Date,default:Date.now()},
  admin:{type:Schema.Types.ObjectId, ref:"User"},
  subscribed_users:[{user:{type:Schema.Types.ObjectId, ref:"User"}}],
  vedik:[{stage:{type:Schema.Types.ObjectId, ref:"Stage"}}],
  events:[{event:{type:Schema.Types.ObjectId, ref:"Event"}}]
});

module.exports = mongoose.model('Club', ClubSchema);