'use strict';

var express = require('express');
var controller = require('./stage.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/tagingStage/:query', controller.index);
router.get('/:id',auth.isAuthenticated(), controller.show);
router.get('/:id/addSubscriber',auth.isAuthenticated(),controller.addSubscriber);
router.delete('/:id/deleteSubscriber',auth.isAuthenticated(),controller.deleteSubscriber);
router.post('/',auth.isAuthenticated(), controller.create);
router.put('/:id',auth.isAuthenticated(), controller.update);
router.patch('/:id',auth.isAuthenticated(), controller.update);
router.delete('/:id',auth.isAuthenticated(), controller.destroy);
router.get('/search/:searchQuery', controller.search);

module.exports = router;