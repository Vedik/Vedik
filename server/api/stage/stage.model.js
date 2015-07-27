'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var StageSchema = new Schema({
  name:{type:String,unique:true},
  createdOn:{type:Date,default:Date.now()},
  subscribed_users:[{user:{type:Schema.Types.ObjectId, ref:'User'}}],
  groups:[{groupId:{type:Schema.Types.ObjectId, ref:'Group'}}],
  admins:[{user:{type:Schema.Types.ObjectId, ref:'User'}}],
  trendingPosts:[{video:{type:Schema.Types.ObjectId, ref:'Post'}}],
  bookedPosts:[{user:{type:Schema.Types.ObjectId, ref:'Post'}}]
});

module.exports = mongoose.model('Stage', StageSchema);