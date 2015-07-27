'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name: String,
  start_time:{type:Date,default:Date.now()},
  end_time:{type:Date,default:Date.now()},
  picUrl:String,
  venue:String,
  attending_users:[{user:{type:Schema.Types.ObjectId, ref:'User'}}],
  reviews:[{video:{type:Schema.Types.ObjectId, ref:'Review'}}]
});

module.exports = mongoose.model('Event', EventSchema);