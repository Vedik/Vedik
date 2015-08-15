'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  imgName: String,
  picUrl:String,
  description:String,
  tags:[String],
  createdOn:{type:Date,default:Date.now()},
  uploader:[{type:Schema.Types.ObjectId, ref:"User"}],
  rating:Number,
  view_count:Number,

});

module.exports = mongoose.model('Image', ImageSchema);