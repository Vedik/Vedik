'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClubSchema = new Schema({
  name: String,
  posts:[{post:{type:Schema.Types.ObjectId, ref:"Post"}}],
  picUrl:String,
  description:String,
  subscribed_users:[{user:{type:Schema.Types.ObjectId, ref:"User"}}],
  stage_for:[{stage:{type:Schema.Types.ObjectId, ref:"Stage"}}],
  events:[{event:{type:Schema.Types.ObjectId, ref:"Event"}}]
});

module.exports = mongoose.model('Club', ClubSchema);