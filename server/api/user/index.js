'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id/addSubscriber',auth.isAuthenticated(),controller.addSubscriber);
router.delete('/:id/deleteSubscriber',auth.isAuthenticated(),controller.deleteSubscriber);
//router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/addHOF/:postId',auth.isAuthenticated(), controller.addHOF);

//router.post('/galleryPic/', auth.isAuthenticated(), controller.galPicChange);
router.post('/editProfile/:type', auth.isAuthenticated(), controller.editProfile);
router.get('/search/:searchQuery', controller.search);
router.get('/:id',auth.isAuthenticated(), controller.showUser);

module.exports = router;
