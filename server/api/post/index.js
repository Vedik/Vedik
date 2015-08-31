'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/likeInfo/:postIdLike',auth.isAuthenticated(), controller.likeInfo);
router.get('/user/:id', controller.showForUser);
router.get('/club/:id', controller.showForClub);
router.post('/', controller.create);
router.get('/:postId/like',auth.isAuthenticated(),controller.like);
router.delete('/:postId/unlike',auth.isAuthenticated(),controller.unlike);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;