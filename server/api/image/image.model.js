'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  name: String,
  picUrl:String,
  description:String,
  tags:[String],
  upload_data:{type:Date,default:Date.now()},
  uploader:[{user:{type:Schema.Types.ObjectId, ref:"User"}}],
  rating:Number
});

module.exports = mongoose.model('Image', ImageSchema);