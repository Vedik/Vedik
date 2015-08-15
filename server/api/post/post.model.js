'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  	videoId: {type:Schema.Types.ObjectId, ref:"Video"},
    imageId:{type:Schema.Types.ObjectId, ref:"Image"},
    articleId:{type:Schema.Types.ObjectId, ref:"Article"},
    type:Number,
    createdOn:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Post', PostSchema);

