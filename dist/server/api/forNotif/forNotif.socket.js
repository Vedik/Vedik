/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ForNotif = require('./forNotif.model');

exports.register = function(socket) {
  ForNotif.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ForNotif.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('forNotif:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('forNotif:remove', doc);
}