'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  	videoId: {type:Schema.Types.ObjectId, ref:"Video"},
    imageId:{type:Schema.Types.ObjectId, ref:"Image"},
    articleId:{type:Schema.Types.ObjectId, ref:"Article"},
    type:Number,
    uploader:{type:Schema.Types.ObjectId, ref:"User"},
    like:[{user:{type:Schema.Types.ObjectId,ref:'User'}}],
    comments:[{comment:{type:Schema.Types.ObjectId, ref:"Comment"}}],
    rating:{type:Number,default:0},
    tags: [String],
    viewCount:{type:Number,default:0},
    createdOn:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('Post', PostSchema);

