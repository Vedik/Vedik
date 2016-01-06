'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/:bookingDate', controller.index);
//router.get('/:id', controller.show);
router.post('/:post_id',auth.isAuthenticated(), controller.create);
router.put('/:bookingCheckbox',auth.isAuthenticated(), controller.update); 
router.patch('/:id', controller.update);
router.delete('/:postId', controller.destroy);

module.exports = router;