var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.actions.events.get
  );

  router.get('/:id',
    server.actions.events.show
  );

  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('title'),
    server.actions.events.create
  );

  router.put('/:id',
    server.middlewares.bodyparser,
    server.actions.events.update
  );

  router.delete('/:name',
    server.actions.events.remove
  );

  return router;
};
