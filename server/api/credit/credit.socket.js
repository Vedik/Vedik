/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Credit = require('./credit.model');

exports.register = function(socket) {
  Credit.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Credit.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('credit:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('credit:remove', doc);
}