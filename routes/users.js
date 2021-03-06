var router = require('express').Router();

module.exports = function(server){
  router.get('/', server.actions.users.get);

  router.get('/me',
    server.middlewares.ensureAuthenticated,
    server.middlewares.getUser,
    server.actions.users.me
  );

  router.get('/event/:id', server.actions.users.getByEvent);
  
  router.get('/:id', server.actions.users.show);
  router.post('/',
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields(['password', 'email']),
    server.actions.users.create
  );

  router.delete('/:id', server.actions.users.remove);
 
  router.put('/:id',
    server.middlewares.bodyparser,
    server.actions.users.update
  );

  return router;
};
