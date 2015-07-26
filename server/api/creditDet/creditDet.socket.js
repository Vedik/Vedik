/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CreditDet = require('./creditDet.model');

exports.register = function(socket) {
  CreditDet.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CreditDet.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('creditDet:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('creditDet:remove', doc);
}