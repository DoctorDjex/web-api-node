var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.actions.categories.get
  );

  router.get('/:id',
    server.actions.categories.show
  );

  router.post('/',
    server.middlewares.ensureAuthenticated,
    server.middlewares.bodyparser,
    server.middlewares.ensureBodyFields('label'),
    server.actions.categories.create
  );

  router.put('/:id',
    server.middlewares.bodyparser,
    server.actions.categories.update
  );

  router.delete('/:label',
    server.actions.categories.remove
  );

  return router;
};
