'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ImageSchema = new Schema({
  imgName: String,
  picUrl:String,
  description:String
});

module.exports = mongoose.model('Image', ImageSchema);