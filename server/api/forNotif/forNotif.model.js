'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ForNotifSchema = new Schema({
  	postId:{type:Schema.Types.ObjectId,ref:'Post'},
	type:Number,
	uploader:{user:{type:Schema.Types.ObjectId, ref:"User"}},
	uploaderClub:{type:Schema.Types.ObjectId, ref:"Club"},
	team:String,
	createdOn:{type:Date,default:Date.now()}
});

module.exports = mongoose.model('ForNotif', ForNotifSchema);

var deepPopulate = require('mongoose-deep-populate')(mongoose);
ForNotifSchema.plugin(deepPopulate /* more on options below */);