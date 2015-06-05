'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
  vidname: String,
  description: String,
  genres: [{type:String}],// referencing!?
  vidurl:String,
  posterurl:String,
  view_count:Number,// wat abt likes?
  createdOn:{type:Date},
  comments:[{type:Schema.Types.ObjectId, ref:"Comment"}],
  uploader:{type:Schema.Types.ObjectId, ref:"User"},
  credits:{type:Schema.Types.ObjectId, ref:"Credit"}
});

module.exports = mongoose.model('Video', VideoSchema);