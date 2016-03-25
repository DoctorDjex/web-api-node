var router = require('express').Router();
var bodyparser = require('body-parser').json();

module.exports = function(server){
  router.get('/',
    server.actions.categories.get
  );

  router.get('/:id',
    server.actions.categories.show
  );

  return router;
};
