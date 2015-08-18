'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  articleName: String,
  description:String,
  content:String,
  createdOn:{type:Date,default:Date.now()},
  tags:[String],
  uploader:{type:Schema.Types.ObjectId, ref:"User"},
  rating:Number,
  view_count:Number,
  
});

module.exports = mongoose.model('Article', ArticleSchema);