'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LikeSchema = new Schema({
  id: String,
  like:[{type:Schema.Types.ObjectId,ref:'User'}],
  
});

module.exports = mongoose.model('Like', LikeSchema);