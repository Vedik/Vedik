'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
  vidname:{type:String, required:true, unique:true},
  description: String,
  genres: [String],// referencing!?
  vidurl:{type:String, required:true, unique:true},
  posterurl:String,
  view_count:{type:Number,default:0},// wat abt likes?
  createdOn:{type:Date},
  respect:Number,
  vidRating:{type:Number,default:0},
  votes:{type:Number, default:0},
  comments:[{comment:{type:Schema.Types.ObjectId, ref:"Comment"}}],
  uploader:{type:Schema.Types.ObjectId, ref:"User"},
  directorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  editorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  actorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  storyCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  cinematographyCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  screenplayCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  dialogsCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
});

module.exports = mongoose.model('Video', VideoSchema);