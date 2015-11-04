'use strict';

var express = require('express');
var controller = require('./club.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', auth.isAuthenticated(),controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
//router.put('/editProfile/:type', auth.isAuthenticated(), controller.editProfile);
router.get('/:id/addSubscriber',auth.isAuthenticated(),controller.addSubscriber);
router.delete('/:id/deleteSubscriber',auth.isAuthenticated(),controller.deleteSubscriber);
//router.put('/editProfile/:id',auth.isAuthenticated,controller.editProfile);
router.put('/:id', controller.editProfile);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/search/:searchQuery', controller.search);

module.exports = router;