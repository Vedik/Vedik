'use strict';

var express = require('express');
var controller = require('./like.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:postId', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.get('/:vidId/like',auth.isAuthenticated(),controller.like);
router.delete('/:vidId/unlike',auth.isAuthenticated(),controller.unlike);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;