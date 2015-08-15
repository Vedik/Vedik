'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  	videoId: String,
    imageId:String,
    articleId:String,
    type:Number,
    createdOn:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Post', PostSchema);

