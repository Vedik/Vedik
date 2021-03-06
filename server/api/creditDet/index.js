'use strict';

var express = require('express');
var controller = require('./creditDet.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/',auth.isAuthenticated(), controller.index);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
router.get('/search/:name',controller.searchCredit);
router.delete('/:id',auth.hasRole('admin'), controller.destroy);

module.exports = router;