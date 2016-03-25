var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.middlewares.cache.get
  );

  router.get('/:id',
    server.actions.events.get
  );

  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('title'),
    server.actions.events.create
  );

  router.put('/:id',
    server.middlewares.cache.del('/events'),
    server.middlewares.bodyparser,
    server.actions.events.update
  );

  router.delete('/:name',
    server.middlewares.cache.del('/events'),
    server.actions.events.remove
  );

  return router;
};
