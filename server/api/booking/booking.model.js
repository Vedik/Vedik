'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  sequence:Number,
  bkngCreatedOn:{type:Date,default:Date.now()},
  user:{type:Schema.Types.ObjectId,ref:'User'},
  postId:{type:Schema.Types.ObjectId,ref:'Post'},
  bookedFor:Date,
  status:{type:Number,default:0}, //-1=rejected, 0=pending, 1=approved
  
});

module.exports = mongoose.model('Booking', BookingSchema);