'use strict';

var express = require('express');
var controller = require('./article.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', auth.isAuthenticated(),controller.create);
// router.post('/:id',auth.isAuthenticated(), controller.clubPost);
router.post('/event/:id',auth.isAuthenticated(), controller.eventPost);
router.post('/eventResults/:id',auth.isAuthenticated(), controller.eventResults);
router.put('/:id', auth.isAuthenticated(),controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;