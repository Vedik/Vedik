'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/:bookingDate', controller.index);
router.get('/post/:postId', controller.editBooking);
//router.get('/:id', controller.show);
router.post('/:post_id',auth.isAuthenticated(), controller.create);
router.put('/:bookingCheckbox',auth.isAuthenticated(), controller.update); 
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);


module.exports = router;