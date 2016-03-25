var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.middlewares.cache.get,
    server.actions.todos.get
  );

  router.get('/:id',
    server.actions.todos.show
  );

  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.cache.del('/todos'),
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('name'),
    server.actions.todos.create
  );

  router.put('/:id',
    server.middlewares.cache.del('/todos'),
    server.middlewares.bodyparser,
    server.actions.todos.update);

  router.delete('/:name',
    server.middlewares.cache.del('/todos'),
    server.actions.todos.remove);

  return router;
};
