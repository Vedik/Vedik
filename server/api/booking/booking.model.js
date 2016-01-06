'use strict';

var mongoose = require('mongoose'),	
    Schema = mongoose.Schema;

var BookingSchema = new Schema({
  sequence:Number,
  bkngCreatedOn:{type:Date,default:Date.now()},
  user:{type:Schema.Types.ObjectId,ref:'User'},
  postId:{type:Schema.Types.ObjectId,ref:'Post'},
  bookedFor:String,
  status:{type:Number,default:0}, //-1=rejected, 0=pending, 1=approved
  
});


module.exports = mongoose.model('Booking', BookingSchema);

var deepPopulate = require('mongoose-deep-populate')(mongoose);
BookingSchema.plugin(deepPopulate /* more on options below */);