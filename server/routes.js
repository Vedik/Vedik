/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/bookings', require('./api/booking'));
  app.use('/api/images', require('./api/image'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/reviews', require('./api/review'));
  app.use('/api/events', require('./api/event'));
  app.use('/api/posts', require('./api/post'));
  app.use('/api/clubs', require('./api/club'));
  app.use('/api/likes', require('./api/like'));
  app.use('/api/stages', require('./api/stage'));
  app.use('/api/creditDets', require('./api/creditDet'));
  app.use('/api/credits', require('./api/credit'));
  app.use('/api/genres', require('./api/genre'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/videos', require('./api/video'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
