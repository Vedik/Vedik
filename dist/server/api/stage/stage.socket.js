/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Stage = require('./stage.model');

exports.register = function(socket) {
  Stage.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Stage.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('stage:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('stage:remove', doc);
}