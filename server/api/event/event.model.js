'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EventSchema = new Schema({
  name:String,
  description: String,
  startTime: Date,
  endTime: Date,
  club:{type:Schema.Types.ObjectId, ref:'Club'},
  user:{type:Schema.Types.ObjectId, ref:'User'},
});

module.exports = mongoose.model('Event', EventSchema);