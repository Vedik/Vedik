'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  articleName: String,
  description:String,
  content:String
  
});

module.exports = mongoose.model('Article', ArticleSchema);