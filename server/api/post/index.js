'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/yo/:id',auth.isAuthenticated(), controller.show);
router.get('/likeInfo/:postIdLike',auth.isAuthenticated(), controller.likeInfo);
router.get('/ratingInfo/:postIdRating',auth.isAuthenticated(), controller.ratingInfo);
router.get('/user/:id', controller.showForUser);
router.get('/club/:id', controller.showForClub);
router.get('/event/:id', auth.isAuthenticated(), controller.showForEvent);
router.get('/stage/:id',auth.isAuthenticated(), controller.showForStage);
router.get('/stage/user/:id',auth.isAuthenticated(), controller.showStageForUser);
router.get('/unseenNotifs',auth.isAuthenticated(), controller.unseenNotifs);
router.get('/hof/:id',auth.isAuthenticated(), controller.hof);
router.get('/:postId/like',auth.isAuthenticated(),controller.like);

router.post('/', controller.create);
router.delete('/:postId/unlike',auth.isAuthenticated(),controller.unlike);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:postId', controller.destroy);
router.post('/rating/:postId',auth.isAuthenticated(),controller.rate);

module.exports = router;

