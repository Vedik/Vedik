'use strict';

var express = require('express');
var controller = require('./event.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/club/:clubId', controller.clubEvents);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.get('/attendInfo/:id', auth.isAuthenticated(), controller.attendInfo);
router.post('/attend/:id',auth.isAuthenticated(),controller.addAttend);
router.delete('/attend/:id',auth.isAuthenticated(),controller.unAttend);
router.post('/:id', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;