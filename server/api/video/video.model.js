'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var VideoSchema = new Schema({
  vidname:String,
  description: String,
  
  vidurl:String,
  posterurl:String,
  
  respect:Number,
  
  
  
  /*directorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  editorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  actorCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  storyCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  cinematographyCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  screenplayCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}],
  dialogsCredits:[{name:{type:Schema.Types.ObjectId, ref:'User'},ratingInVid:{type:Number,default:0}}]*/
});

module.exports = mongoose.model('Video', VideoSchema);