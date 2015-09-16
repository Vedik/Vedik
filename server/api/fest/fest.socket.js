/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Fest = require('./fest.model');

exports.register = function(socket) {
  Fest.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Fest.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('fest:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('fest:remove', doc);
}