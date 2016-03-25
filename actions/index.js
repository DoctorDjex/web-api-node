module.exports = function(server){
  server.actions = {
    events: require('./events')(server),
    users: require('./users')(server),
    auth : require('./auth')(server),
    roles: require('./roles')(server)
  }
};
