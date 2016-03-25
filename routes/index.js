module.exports = function(server){
  server.use('/events', require('./events')(server));
  server.use('/users', require('./users')(server));
  server.use('/auth', require('./auth')(server));
  server.use('/roles', require('./roles')(server));
};
