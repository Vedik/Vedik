'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
router.post('/:id',auth.isAuthenticated(), controller.clubPost);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;