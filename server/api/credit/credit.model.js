'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CreditSchema = new Schema({
  // database for video credits like {directorname,directorrating}, also cast rating,etc
  // this will contain a way to add respect(rating) to the cast..
  // suppose a guy's performance is good, the viewer can +1 at his rating which will enhance that guy's rating
  //in his profile, use of refereences here??
  directorCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  editorCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  actorCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  storyCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  cinematographyCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  screenplayCredits:[{type:Schema.Types.ObjectId, ref:'User'}],
  dialogsCredits:[{type:Schema.Types.ObjectId, ref:'User'}],

});

module.exports = mongoose.model('Credit', CreditSchema);