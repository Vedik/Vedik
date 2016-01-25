'use strict';

var express = require('express');
var controller = require('./booking.controller');
var auth  = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
router.get('/post/:postId', controller.editBooking);
//router.get('/:id', controller.show);
router.post('/:post_id',auth.isAuthenticated(), controller.create);
router.put('/update/:bookingCheckbox',auth.isAuthenticated(), controller.update); 
router.patch('/:id', controller.update);
router.delete('/:postId', controller.destroy);
router.delete('/deleteBooking/:id', controller.deleteBooking);

router.get('/post/:postId', controller.sendBookedDates);

module.exports = router;