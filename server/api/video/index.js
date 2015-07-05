'use strict';

var express = require('express');
var controller = require('./video.controller.js');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:vidCode', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
//router.delete('/comments/:videoId/:commentId', controller.deleteComment);
router.delete('/:id', controller.destroy);
router.post('/ratings/:vidCode',auth.isAuthenticated(),controller.rate);
module.exports = router;