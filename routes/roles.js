var router = require('express').Router();

module.exports = function(server){
  router.get('/', server.actions.roles.get);

  router.get('/:id', server.actions.roles.show);
  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.getUser,
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('label'),
    server.actions.roles.create
  );

  router.delete('/:id', server.actions.roles.remove);
 
  router.put('/:id',
    server.middlewares.bodyparser,
    server.actions.roles.update
  );

  return router;
};
