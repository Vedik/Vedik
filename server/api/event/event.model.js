'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name:String,
  description: String,
  startDate: Date,
  endDate: Date,
  club:{type:Schema.Types.ObjectId, ref:'Club'},
  user:{type:Schema.Types.ObjectId, ref:'User'},
  location:String,
  eventCover:String,
  regReq:Boolean,
  comp:Boolean,
  subOnl:Boolean,
  subType:String,
  vedik:[{vedik:{type:Schema.Types.ObjectId,ref:'Stage'}}],
  attending:[{user:{type:Schema.Types.ObjectId,ref:'User'}}],
  entries:[{entry:{type:Schema.Types.ObjectId,ref:'Entry'},user:{type:Schema.Types.ObjectId,ref:'User'}}],
  winners:[{position:{type:Number},user:{type:Schema.Types.ObjectId,ref:'User'}}]
});

module.exports = mongoose.model('Event', EventSchema);

