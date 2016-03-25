var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.actions.events.get
  );

  router.get('/:id',
    server.actions.events.get
  );

  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('name'),
    server.actions.events.create
  );

  router.post('/registration/:id',
    server.middlewares.ensureAuthenticated,
    server.middlewares.getUser,
    server.middlewares.bodyparser,
    server.actions.events.registration
  )

  router.put('/:id',
    server.middlewares.bodyparser,
    server.actions.events.update
  );

  router.delete('/:name',
    server.actions.events.remove
  );

  return router;
};
