'use strict';

var express = require('express');
var controller = require('./club.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(), controller.create);
//router.put('/editProfile/:type', auth.isAuthenticated(), controller.editProfile);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/search/:searchQuery', controller.search);

module.exports = router;