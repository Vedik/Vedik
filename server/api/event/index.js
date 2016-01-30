'use strict';

var express = require('express');
var controller = require('./event.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();
var multiparty = require('connect-multiparty'),
multipartyMiddleware = multiparty();

router.get('/', controller.index);
router.get('/club/:clubId', controller.clubEvents);
router.get('/event/:id', auth.isAuthenticated(), controller.eventShow);
router.get('/comp/:id', auth.isAuthenticated(), controller.compShow);
router.get('/attendInfo/:id', auth.isAuthenticated(), controller.attendInfo);
router.post('/attend/:id',auth.isAuthenticated(),controller.addAttend);
router.delete('/attend/:id',auth.isAuthenticated(),controller.unAttend);
router.get('/showForStage/:id', auth.isAuthenticated(), controller.showForStage);
router.post('/subEntry/:id',auth.isAuthenticated(),multipartyMiddleware, controller.subEntry);
router.post('/declareRes/:id',auth.isAuthenticated(),controller.declareRes);
router.post('/:id', auth.isAuthenticated(), controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;